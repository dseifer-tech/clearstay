// lib/text.ts
export const clamp = (s: string, n: number) =>
  s.length > n ? s.slice(0, n - 1) + "…" : s;

// Common SEO length limits
export const SEO_LIMITS = {
  title: 60,
  description: 160,
  ogTitle: 60,
  ogDescription: 160,
} as const;

// Utility functions for SEO text optimization
export const optimizeTitle = (title: string) => clamp(title, SEO_LIMITS.title);
export const optimizeDescription = (description: string) => clamp(description, SEO_LIMITS.description);
export const optimizeOGTitle = (title: string) => clamp(title, SEO_LIMITS.ogTitle);
export const optimizeOGDescription = (description: string) => clamp(description, SEO_LIMITS.ogDescription);
