import { NextRequest, NextResponse } from 'next/server';
import { IMAGE_OPTIMIZATION } from '@/lib/constants';

// Security: Blocked hosts and private IP ranges
const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const PRIVATE_CIDR = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./, /^169\.254\./];

function isPrivateHost(host: string): boolean {
  if (BLOCKED_HOSTS.has(host)) return true;
  return PRIVATE_CIDR.some(rx => rx.test(host));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const hotelName = searchParams.get('hotel') || 'image';

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  // Validate URL format and security
  let url: URL;
  try {
    url = new URL(imageUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  // Security checks
  if (!/^https?:$/.test(url.protocol) || isPrivateHost(url.hostname)) {
    return NextResponse.json({ error: 'Blocked URL' }, { status: 400 });
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'Referer': url.origin,
      },
      cache: 'no-store', // Don't cache the fetch, but we'll set our own cache headers
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) {
      console.error(`HTTP error ${res.status} for ${hotelName}: ${imageUrl}`);
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    // Validate content type
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    if (!contentType.startsWith('image/')) {
      console.error(`Invalid content type for ${hotelName}: ${contentType}`);
      throw new Error(`Invalid content type: ${contentType}`);
    }

    const arrayBuf = await res.arrayBuffer();

    // Return the image with proper headers
    const resp = new NextResponse(arrayBuf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': IMAGE_OPTIMIZATION.CACHE.PROXY,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    return resp;
  } catch (error) {
    console.error(`Error fetching hotel image for ${hotelName}:`, error);
    console.error(`Failed URL: ${imageUrl}`);
    
    // Return a 1x1 transparent PNG instead of JSON error
    const transparentPng = Uint8Array.from(
      atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAD0lEQVR4nGMAAQAABQABNqv1nQAAAABJRU5ErkJggg=='),
      c => c.charCodeAt(0)
    );
    
    return new NextResponse(transparentPng, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': IMAGE_OPTIMIZATION.CACHE.FALLBACK,
        'Access-Control-Allow-Origin': '*',
        'X-Fallback': 'true',
      },
    });
  }
}
