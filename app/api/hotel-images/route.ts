// app/api/hotel-images/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BLOCKED = new Set(['localhost', '127.0.0.1']);
const PRIVATE = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./, /^169\.254\./];

function isPrivateHost(host: string) {
  return BLOCKED.has(host) || PRIVATE.some(rx => rx.test(host));
}

function normalizeImageUrl(u: URL) {
  // Downsize massive Google photos: ... =s10000 → s1200
  if (u.hostname.endsWith('googleusercontent.com')) {
    u.search = ''; // they encode size as suffix, not query
    u.pathname = u.pathname.replace(/=s\d+$/, '=s1200');
    if (!/=s\d+$/.test(u.pathname)) u.pathname += '=s1200';
  }
  return u;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const urlStr = searchParams.get('url');
  if (!urlStr) return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });

  console.log('Proxy request for URL:', urlStr);

  // Unwrap accidental double-proxying
  let target = urlStr;
  try {
    const maybe = new URL(urlStr, 'https://dummy.invalid');
    if (maybe.pathname.startsWith('/api/hotel-images') && maybe.searchParams.get('url')) {
      target = maybe.searchParams.get('url')!;
      console.log('Unwrapped double-proxy to:', target);
    }
  } catch {}

  let url: URL;
  try { url = new URL(target); } catch { return NextResponse.json({ error: 'Invalid URL' }, { status: 400 }); }
  if (!/^https?:$/.test(url.protocol) || isPrivateHost(url.hostname)) {
    return NextResponse.json({ error: 'Blocked URL' }, { status: 400 });
  }

  url = normalizeImageUrl(url);
  console.log('Normalized URL:', url.toString());

  try {
    const upstream = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'Referer': url.origin,
      },
      cache: 'no-store',
    });

    console.log('Upstream response status:', upstream.status);
    console.log('Upstream content-type:', upstream.headers.get('content-type'));

    if (!upstream.ok) {
      console.error('Upstream failed:', upstream.status, upstream.statusText);
      return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
    }

    const type = upstream.headers.get('content-type') ?? 'application/octet-stream';
    if (!type.startsWith('image/')) {
      console.error('Invalid content type:', type);
      return NextResponse.json({ error: `Invalid content type: ${type}` }, { status: 502 });
    }

    // Stream the body to avoid memory / size issues on Vercel
    if (upstream.body) {
      console.log('Using streaming response');
      return new NextResponse(upstream.body as any, {
        status: 200,
        headers: {
          'Content-Type': type,
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      });
    }

    // Fallback if no stream available
    console.log('Using buffer response');
    const buf = await upstream.arrayBuffer();
    console.log('Buffer size:', buf.byteLength, 'bytes');
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (e) {
    console.error('Proxy error:', e);
    // Transparent 1x1 PNG fallback
    const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAD0lEQVR4nGMAAQAABQABNqv1nQAAAABJRU5ErkJggg==';
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=600',
      },
    });
  }
}
