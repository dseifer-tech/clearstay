import type { Metadata } from "next";
import DowntownPageClient from "./DowntownPageClient";

export const metadata: Metadata = {
  title: "Downtown Toronto Hotels — Direct Booking",
  description:
    "Browse downtown Toronto hotels near CN Tower, ROM, and St. Lawrence Market. See real direct rates and book securely with InnstaStay.",
  alternates: {
    canonical: "https://www.innstastay.com/hotels/toronto-downtown",
  },
  openGraph: {
    title: "Downtown Toronto Hotels — Direct Booking",
    description:
      "Find verified direct hotel rates near major attractions—commission-free.",
    url: "https://www.innstastay.com/hotels/toronto-downtown",
    images: [
      {
        url: "https://www.innstastay.com/innstastay-logo.svg",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function DowntownPage() {
  return <DowntownPageClient />;
}
