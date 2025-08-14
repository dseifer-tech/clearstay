# Hero Images Implementation Guide

## 📁 File Structure

```
public/
├── hero/                    # Hero images (1920x800px)
│   ├── homepage.jpg         # Toronto skyline with hotels
│   ├── about.jpg           # Team/office environment
│   ├── search.jpg          # Hotel search interface
│   ├── toronto-downtown.jpg # Downtown Toronto skyline
│   ├── hotel-fallback.jpg  # Generic hotel image
│   ├── page-fallback.jpg   # Generic page image
│   └── [hotel-slugs].jpg   # Individual hotel images
├── og/                     # Open Graph images (1200x630px)
└── brand/                  # Logo images (600x200px)
```

## 📐 Image Specifications

### Hero Images: 1920x800px
- **Aspect Ratio**: 2.4:1 (wide and cinematic)
- **Format**: JPG for photos, PNG for graphics with transparency
- **File Size**: Keep under 500KB for fast loading
- **Quality**: 80-85% compression for good balance
- **Color Profile**: sRGB

### Open Graph Images: 1200x630px
- **Aspect Ratio**: 1.91:1 (Facebook/Twitter optimized)
- **Format**: JPG
- **File Size**: Under 300KB

## 🎨 Image Content Suggestions

### Main Pages

#### Homepage (`/hero/homepage.jpg`)
- **Content**: Toronto skyline with CN Tower, modern hotel exteriors
- **Style**: Bright, welcoming, professional
- **Colors**: Blue/white theme matching brand
- **Focus**: Urban sophistication, travel, luxury

#### About Page (`/hero/about.jpg`)
- **Content**: Team collaboration, modern office, technology theme
- **Style**: Professional but approachable
- **Colors**: Clean, modern, trustworthy
- **Focus**: Innovation, transparency, team

#### Search Page (`/hero/search.jpg`)
- **Content**: Hotel lobby, booking interface, travel planning
- **Style**: Clean, functional, user-friendly
- **Colors**: Neutral with brand accents
- **Focus**: Search, comparison, booking

#### Toronto Downtown (`/hero/toronto-downtown.jpg`)
- **Content**: Downtown Toronto skyline, CN Tower prominent
- **Style**: Urban, vibrant, city life
- **Colors**: City lights, blue hour, urban energy
- **Focus**: Location, attractions, city experience

### Hotel-Specific Images

#### Pantages Hotel (`/hero/pantages-hotel-downtown-toronto.jpg`)
- **Content**: Art deco architecture, vintage elegance
- **Style**: Classic luxury, historic charm
- **Colors**: Warm golds, rich reds, classic elegance

#### Town Inn Suites (`/hero/town-inn-suites.jpg`)
- **Content**: Modern boutique hotel exterior
- **Style**: Contemporary, clean, accessible
- **Colors**: Modern neutrals, clean lines

#### One King West (`/hero/one-king-west-hotel-residence.jpg`)
- **Content**: Historic building with modern touches
- **Style**: Heritage luxury, sophisticated
- **Colors**: Rich browns, classic elegance

#### Omni King Edward (`/hero/the-omni-king-edward-hotel.jpg`)
- **Content**: Classic luxury hotel facade
- **Style**: Timeless elegance, upscale
- **Colors**: Sophisticated neutrals, luxury tones

#### Chelsea Hotel (`/hero/chelsea-hotel-toronto.jpg`)
- **Content**: Family-friendly hotel with amenities
- **Style**: Welcoming, comfortable, accessible
- **Colors**: Warm, inviting, family-friendly

#### Anndore House (`/hero/the-anndore-house-jdv.jpg`)
- **Content**: Boutique hotel with character
- **Style**: Unique, artistic, boutique
- **Colors**: Creative, distinctive, boutique charm

#### Sutton Place (`/hero/sutton-place-hotel-toronto.jpg`)
- **Content**: Upscale hotel exterior
- **Style**: Refined luxury, sophisticated
- **Colors**: Elegant neutrals, upscale tones

#### Ace Hotel (`/hero/ace-hotel-toronto.jpg`)
- **Content**: Contemporary, artistic atmosphere
- **Style**: Modern, creative, hip
- **Colors**: Contemporary, artistic, trendy

## 🔧 Implementation

### 1. Add Hero Image to Page

```tsx
import HeroImage from '@/app/components/HeroImage';
import { getHeroImage, getHeroAltText } from '@/lib/heroImages';

// In your component
<HeroImage 
  src={getHeroImage('page-slug')}
  alt={getHeroAltText('page-slug')}
  priority={true}
  className="h-96 md:h-[500px] lg:h-[600px]"
/>
```

### 2. Hero with Content Overlay

```tsx
<section className="relative">
  <HeroImage 
    src={getHeroImage('homepage')}
    alt={getHeroAltText('homepage')}
    priority={true}
    className="h-96 md:h-[500px] lg:h-[600px]"
  />
  
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      {/* Your content here */}
    </div>
  </div>
</section>
```

### 3. Hotel Page Implementation

```tsx
// In hotel slug page
<HeroImage 
  src={getHotelHeroImage(params.slug)}
  alt={getHeroAltText(params.slug)}
  priority={true}
  className="h-64 md:h-80"
/>
```

## 📱 Responsive Behavior

The HeroImage component automatically handles:
- **Mobile**: 384px height (h-96)
- **Tablet**: 500px height (md:h-[500px])
- **Desktop**: 600px height (lg:h-[600px])
- **Object-fit**: cover for consistent cropping
- **Loading**: Priority loading for above-the-fold images

## 🎯 SEO Benefits

### 1. Visual Appeal
- Immediate visual impact
- Professional appearance
- Brand consistency

### 2. User Engagement
- Longer time on page
- Better bounce rates
- Increased conversions

### 3. Social Sharing
- Rich previews on social media
- Better click-through rates
- Brand recognition

## 🚀 Performance Tips

### 1. Image Optimization
- Use WebP format when possible
- Implement lazy loading for below-fold images
- Use appropriate compression

### 2. Loading Strategy
- Priority loading for hero images
- Preload critical images
- Use responsive images

### 3. Caching
- Set appropriate cache headers
- Use CDN for global delivery
- Implement image caching

## 📋 Checklist

### Before Implementation
- [ ] Create `/public/hero/` directory
- [ ] Prepare images in 1920x800px format
- [ ] Optimize images for web (under 500KB)
- [ ] Test images on different devices

### During Implementation
- [ ] Add HeroImage component to pages
- [ ] Update metadata with hero image paths
- [ ] Test responsive behavior
- [ ] Verify loading performance

### After Implementation
- [ ] Test on multiple devices
- [ ] Check Core Web Vitals
- [ ] Verify social media previews
- [ ] Monitor user engagement metrics

## 🎨 Design Guidelines

### Color Palette
- **Primary**: Blue (#1F60C4) - Trust, professionalism
- **Secondary**: White (#FFFFFF) - Clean, modern
- **Accent**: Green (#10B981) - Success, positive
- **Neutral**: Gray (#6B7280) - Balance, sophistication

### Typography
- **Hero Titles**: Bold, large, high contrast
- **Overlays**: Semi-transparent backgrounds
- **Text**: Ensure readability over images

### Composition
- **Rule of Thirds**: Position key elements
- **Leading Lines**: Guide eye to CTA
- **Negative Space**: Don't overcrowd
- **Brand Consistency**: Maintain visual identity

## 🔄 Maintenance

### Regular Tasks
- **Monthly**: Check image loading speeds
- **Quarterly**: Update seasonal images
- **Annually**: Refresh outdated images
- **As needed**: Add new hotel images

### Monitoring
- **Performance**: Core Web Vitals
- **Engagement**: Time on page, bounce rate
- **Conversion**: Booking rates, CTA clicks
- **Technical**: Image loading errors, 404s
