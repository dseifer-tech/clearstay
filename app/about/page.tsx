import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About InnstaStay — Commission-Free Booking",
  description:
    "InnstaStay connects you to hotels' real prices—no middlemen, no fees. Learn how direct booking works and why it saves you money in Toronto.",
  alternates: { canonical: "https://www.innstastay.com/about" },
  openGraph: {
    title: "About InnstaStay — Commission-Free Booking",
    description:
      "How InnstaStay eliminates middlemen to provide direct hotel booking in Toronto.",
    url: "https://www.innstastay.com/about",
    images: [{ url: "https://www.innstastay.com/innstastay-logo.svg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
