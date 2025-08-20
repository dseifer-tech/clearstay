import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | InnstaStay",
  description:
    "Get in touch with InnstaStay. Questions about bookings, partnerships, or support? Email us at info@innstastay.com.",
  alternates: { canonical: "https://www.innstastay.com/contact" },
  openGraph: {
    title: "Contact InnstaStay",
    description:
      "Questions about bookings, partnerships, or support? Email info@innstastay.com.",
    url: "https://www.innstastay.com/contact",
    images: [{ url: "https://www.innstastay.com/innstastay-logo.svg" }],
  },
  twitter: { card: "summary" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
