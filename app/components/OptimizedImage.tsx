'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);

  // Check if this is a proxy URL (should bypass Next.js image optimization)
  const isProxyUrl = src.includes('/api/hotel-images');

  // Fallback for error state
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  // Use regular img tag for proxy URLs to avoid Next.js image optimization issues
  if (isProxyUrl) {
    return (
      <div className={`relative ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`
            transition-opacity duration-300
            opacity-100
            ${fill ? 'absolute inset-0 w-full h-full object-cover' : ''}
          `}
          style={{
            ...style,
            ...(fill ? { position: 'absolute', height: '100%', width: '100%', inset: 0 } : {})
          }}
          onError={() => setHasError(true)}
          {...props}
        />
      </div>
    );
  }

  // Use Next.js Image for non-proxy URLs
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        priority={priority}
        fill={fill}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        style={style}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
