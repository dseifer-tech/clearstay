import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testUrl = searchParams.get('url');

  if (!testUrl) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
  }

  try {
    console.log(`Testing URL: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/',
      },
      redirect: 'follow',
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      return NextResponse.json({
        error: `HTTP ${response.status}: ${response.statusText}`,
        url: testUrl,
        headers: Object.fromEntries(response.headers.entries())
      }, { status: response.status });
    }

    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');

    return NextResponse.json({
      success: true,
      url: testUrl,
      status: response.status,
      contentType,
      contentLength,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    console.error('Error testing URL:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      url: testUrl
    }, { status: 500 });
  }
}
