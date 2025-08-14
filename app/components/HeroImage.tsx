import Image from 'next/image';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function HeroImage({ src, alt, className = '', priority = false }: HeroImageProps) {
  return (
    <div className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
      />
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
