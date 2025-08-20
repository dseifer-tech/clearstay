// Environment variable validation
export function validateEnv() {
  const required = {
    SERPAPI_KEY: process.env.SERPAPI_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return required;
}

// Validate on import
if (typeof window === 'undefined') {
  // Only validate on server side
  try {
    validateEnv();
  } catch (error) {
    console.error('Environment validation failed:', error.message);
    // Don't throw in development to allow fallback data
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}
