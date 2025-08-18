import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const hotelName = searchParams.get('hotel');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Referer': 'https://www.google.com/',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(`HTTP error ${response.status} for ${hotelName}: ${imageUrl}`);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check if response is actually an image
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Invalid content type for ${hotelName}: ${contentType}`);
      throw new Error(`Invalid content type: ${contentType}`);
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error(`Error fetching hotel image for ${hotelName}:`, error);
    console.error(`Failed URL: ${imageUrl}`);
    
    // Return a fallback image instead of JSON error
    // You can replace this with a local fallback image path
    const fallbackImageUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
    
    try {
      const fallbackResponse = await fetch(fallbackImageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        signal: AbortSignal.timeout(5000),
      });
      
      if (fallbackResponse.ok) {
        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        const fallbackContentType = fallbackResponse.headers.get('content-type') || 'image/jpeg';
        
        return new NextResponse(fallbackBuffer, {
          status: 200,
          headers: {
            'Content-Type': fallbackContentType,
            'Cache-Control': 'public, max-age=3600', // Cache fallback for 1 hour
            'Access-Control-Allow-Origin': '*',
            'X-Fallback': 'true',
          },
        });
      }
    } catch (fallbackError) {
      console.error('Fallback image also failed:', fallbackError);
    }
    
    // If everything fails, return a simple error response
    return NextResponse.json(
      { error: 'Failed to load image', hotel: hotelName },
      { status: 500 }
    );
  }
}
