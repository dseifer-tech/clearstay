import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testUrl = searchParams.get('url') || 'https://lh5.googleusercontent.com/p/AF1QipMt1ZolVWnJTgIMqogAUCjh9EldFh8vSDHY5TU=s10000';
  
  console.log('Testing URL:', testUrl);
  
  try {
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('Content-Length:', response.headers.get('content-length'));
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      console.log('Image size:', buffer.byteLength, 'bytes');
      
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'image/jpeg',
          'Cache-Control': 'public, s-maxage=3600',
        },
      });
    } else {
      return NextResponse.json({ error: `Failed to fetch: ${response.status}` }, { status: 502 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}

