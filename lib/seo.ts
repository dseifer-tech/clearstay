// SEO Utility Library for InnstaStay

import type { Metadata } from "next";
import type { HotelRecord } from "@/types/hotel";

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export interface StructuredData {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: any;
}

export interface HotelStructuredData extends StructuredData {
  "@type": "Hotel";
  name: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  telephone?: string;
  url: string;
  image?: string[];
  description?: string;
  priceRange?: string;
  starRating?: {
    "@type": "Rating";
    ratingValue: number;
    bestRating: number;
  };
}

export interface BreadcrumbStructuredData extends StructuredData {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface OrganizationStructuredData extends StructuredData {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export const DEFAULT_SEO = {
  title: "InnstaStay - Direct Hotel Booking | No Commission",
  description: "Book hotels directly with verified rates. No hidden fees, no commission. Compare and save on your next stay.",
  keywords: "hotel booking, direct booking, no commission, verified rates, Toronto hotels",
  ogTitle: "InnstaStay - Direct Hotel Booking | No Commission",
  ogDescription: "Book hotels directly with verified rates. No hidden fees, no commission.",
  ogImage: "/og/innstastay-1200x630.jpg",
  ogUrl: "https://www.innstastay.com",
  twitterCard: "summary_large_image",
  twitterTitle: "InnstaStay - Direct Hotel Booking",
  twitterDescription: "Book hotels directly with verified rates. No hidden fees, no commission.",
  twitterImage: "/og/innstastay-1200x630.jpg",
  canonical: "https://www.innstastay.com"
};

const clamp = (s: string, n: number) =>
  s.length > n ? s.slice(0, n - 1) + "…" : s;

function areaPhrase(h: HotelRecord) {
  if (h.area) return `${h.area} ${h.city}`;
  if (h.tags?.includes("yorkville")) return `Yorkville ${h.city}`;
  if (h.tags?.includes("financial_district")) return `Financial District ${h.city}`;
  if (h.tags?.includes("entertainment_district")) return `Entertainment District ${h.city}`;
  if (h.tags?.includes("downtown")) return `Downtown ${h.city}`;
  return h.city;
}

function leadBenefit(h: HotelRecord) {
  const t = new Set(h.tags ?? []);
  if (t.has("extended_stay")) return "Apartment-style suites with kitchens";
  if (t.has("boutique")) return "Boutique hotel with stylish rooms";
  if (t.has("family_friendly")) return "Family-friendly with spacious rooms";
  if (t.has("luxury")) return "Upscale hotel with refined amenities";
  if (t.has("business")) return "Business-friendly near offices and transit";
  return "Central hotel with easy access to top sights";
}

export function buildHotelMetadata(h: HotelRecord): Metadata {
  const rawTitle = h.seoTitle ?? `${h.name} — Direct Booking | InnstaStay`;
  const rawDesc =
    h.seoDescription ??
    `${leadBenefit(h)} in ${areaPhrase(h)}. Compare verified direct rates and book commission-free.`;

  const title = clamp(rawTitle, 60);
  const description = clamp(rawDesc, 160);

  const url = `https://www.innstastay.com/hotels/${h.slug}`;
  const ogPrimary = h.ogImage ?? `/og/${h.slug}-1200x630.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title.replace(" | InnstaStay", ""),
      description,
      url,
      images: [{ url: `https://www.innstastay.com${ogPrimary}` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function generateMetaTags(meta: Partial<MetaTags>, path: string = ''): MetaTags {
  return {
    ...DEFAULT_SEO,
    ...meta,
    canonical: meta.canonical || `${DEFAULT_SEO.canonical}${path}`,
    ogUrl: meta.ogUrl || `${DEFAULT_SEO.ogUrl}${path}`,
  };
}

export function generateHotelStructuredData(hotel: {
  name: string;
  city: string;
  province: string;
  country: string;
  phone?: string;
  url: string;
  images?: string[];
  description?: string;
  priceRange?: string;
  starRating?: number;
}): HotelStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.city,
      addressRegion: hotel.province,
      addressCountry: hotel.country,
    },
    telephone: hotel.phone,
    url: hotel.url,
    image: hotel.images,
    description: hotel.description,
    priceRange: hotel.priceRange,
    starRating: hotel.starRating ? {
      "@type": "Rating",
      ratingValue: hotel.starRating,
      bestRating: 5,
    } : undefined,
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateOrganizationStructuredData(): OrganizationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InnstaStay",
    url: "https://www.innstastay.com",
    logo: "https://www.innstastay.com/logo.png",
    sameAs: [
      "https://twitter.com/innstastay",
      "https://facebook.com/innstastay",
      "https://instagram.com/innstastay",
    ],
  };
}

export function generateWebsiteStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InnstaStay",
    url: "https://www.innstastay.com",
    description: "Direct hotel booking platform with verified rates and no commission",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.innstastay.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "InnstaStay",
    description: "Direct hotel booking service",
    url: "https://www.innstastay.com",
    telephone: "+1-800-INNSTAY",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6532,
      longitude: -79.3832,
    },
  };
}

export function optimizeTitle(title: string, maxLength: number = 60): string {
  return title.length > maxLength ? title.slice(0, maxLength - 1) + "…" : title;
}

export function optimizeDescription(description: string, maxLength: number = 160): string {
  return description.length > maxLength ? description.slice(0, maxLength - 1) + "…" : description;
}

export function generateKeywords(content: string, maxKeywords: number = 10): string {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word)
    .join(', ');
}

export function validateStructuredData(data: StructuredData): boolean {
  try {
    return data["@context"] === "https://schema.org" && 
           typeof data["@type"] === "string" &&
           data["@type"].length > 0;
  } catch {
    return false;
  }
}

export const pageMetaGenerators = {
  home: () => generateMetaTags({
    title: "InnstaStay - Direct Hotel Booking | No Commission",
    description: "Book hotels directly with verified rates. No hidden fees, no commission. Compare and save on your next stay.",
  }),
  
  about: () => generateMetaTags({
    title: "About InnstaStay - Direct Hotel Booking Platform",
    description: "Learn about InnstaStay's mission to provide transparent, commission-free hotel booking with verified direct rates.",
  }, "/about"),
  
  contact: () => generateMetaTags({
    title: "Contact InnstaStay - Get in Touch",
    description: "Contact InnstaStay for support, partnerships, or questions about our direct hotel booking service.",
  }, "/contact"),
  
  search: () => generateMetaTags({
    title: "Search Hotels - Find Your Perfect Stay",
    description: "Search and compare hotels with verified direct rates. No hidden fees, no commission.",
  }, "/search"),
  
  privacy: () => generateMetaTags({
    title: "Privacy Policy - InnstaStay",
    description: "Learn how InnstaStay protects your privacy and handles your personal information.",
  }, "/privacy"),
};

export default {
  generateMetaTags,
  generateHotelStructuredData,
  generateBreadcrumbStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateFAQStructuredData,
  generateLocalBusinessStructuredData,
  optimizeTitle,
  optimizeDescription,
  generateKeywords,
  validateStructuredData,
  buildHotelMetadata,
  DEFAULT_SEO,
  pageMetaGenerators,
};
