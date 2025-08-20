import type { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/app/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'Privacy Policy | InnstaStay',
  description: 'How we collect, use, and protect your information when you use InnstaStay.',
  robots: 'index, follow'
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex flex-col items-center">
                <OptimizedImage
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  width={100}
                  height={80}
                  priority
                  className="h-12 sm:h-16 md:h-20 w-auto block"
                />
                <span className="text-xs text-blue-600 tracking-wide mt-1">Commission-Free Booking</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 19, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect minimal information necessary to provide our hotel booking service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Search parameters:</strong> Check-in/check-out dates, number of guests (adults/children)</li>
                <li><strong>Technical data:</strong> IP address, browser type, device information</li>
                <li><strong>Usage analytics:</strong> Pages visited, search queries (anonymized)</li>
              </ul>
              <p className="text-gray-700">
                <strong>We do NOT collect:</strong> Names, email addresses, phone numbers, payment information, or any personally identifiable information (PII).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide real-time hotel pricing and availability</li>
                <li>Improve our service and user experience</li>
                <li>Analyze usage patterns (anonymized)</li>
                <li>Ensure security and prevent abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                <strong>Search data:</strong> Automatically deleted after 30 days<br/>
                <strong>Analytics data:</strong> Retained for 14 months maximum<br/>
                <strong>Logs:</strong> Retained for 90 days with IP addresses anonymized
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">We implement comprehensive security measures:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Rate limiting to prevent abuse</li>
                <li>Input validation and sanitization</li>
                <li>Security headers (CSP, HSTS, etc.)</li>
                <li>No sensitive data stored in client-side code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">We use these third-party services:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>SerpAPI:</strong> Hotel pricing data (no PII shared)</li>
                <li><strong>Google Analytics:</strong> Usage analytics (IP anonymization enabled)</li>
                <li><strong>Vercel:</strong> Hosting and CDN services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Request deletion of any data we may have about you</li>
                <li>Opt out of analytics tracking</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related questions or data deletion requests:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@innstastay.com<br/>
                  <strong>Response time:</strong> Within 30 days<br/>
                  <strong>Data deletion:</strong> Processed within 30 days
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify users of any material changes by updating the &quot;Last updated&quot; date at the top of this page.
              </p>
            </section>

            <div className="border-t pt-8 mt-8">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
