import { NextRequest, NextResponse } from 'next/server';
import { IMAGE_OPTIMIZATION } from '@/lib/constants';

// Force Node runtime and disable caching for Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // disable ISR for this route

// Security: Blocked hosts and private IP ranges
const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const PRIVATE_CIDR = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./, /^169\.254\./];

function isPrivateHost(host: string): boolean {
  if (BLOCKED_HOSTS.has(host)) return true;
  return PRIVATE_CIDR.some(rx => rx.test(host));
}

// Normalize image URLs to prevent oversized responses
function normalizeImageUrl(u: URL) {
  // Google Photos: enforce a smaller size (e.g., s1200)
  if (u.hostname.endsWith('googleusercontent.com')) {
    // Common pattern: .../p/<id>=sNNNN
    u.search = ''; // strip any search (they usually use =s### as a suffix, not query)
    u.pathname = u.pathname.replace(/=s\d+$/, '=s1200');
    if (!/=s\d+$/.test(u.pathname)) {
      u.pathname += '=s1200';
    }
  }
  // OPTIONAL: add other CDNs here (e.g., ?w=1200 for known hosts)

  return u;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const urlStr = searchParams.get('url');
  const hotelName = searchParams.get('hotel') || 'image';

  if (!urlStr) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  // UNWRAP if someone double-proxied
  let target = urlStr;
  try {
    const t = new URL(urlStr, 'https://dummy.invalid');
    if (t.pathname.startsWith('/api/hotel-images') && t.searchParams.get('url')) {
      target = t.searchParams.get('url')!;
    }
  } catch {}

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!/^https?:$/.test(url.protocol) || isPrivateHost(url.hostname)) {
    return NextResponse.json({ error: 'Blocked URL' }, { status: 400 });
  }

  // Normalize the URL to prevent oversized responses
  url = normalizeImageUrl(url);

  try {
    const upstream = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'Referer': url.origin,
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
    }

    const type = upstream.headers.get('content-type') ?? 'application/octet-stream';
    if (!type.startsWith('image/')) {
      return NextResponse.json({ error: `Invalid content type: ${type}` }, { status: 502 });
    }

    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': type,
        'Cache-Control': IMAGE_OPTIMIZATION.CACHE.PROXY,
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}
