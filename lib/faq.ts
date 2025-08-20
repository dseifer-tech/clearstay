// lib/faq.ts
export function buildHotelFAQJsonLd(hotelName: string, city: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Does ${hotelName} offer free Wi-Fi?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, complimentary Wi-Fi is available for all guests."
        }
      },
      {
        "@type": "Question",
        "name": `Is parking available at ${hotelName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On-site parking is available for an additional fee."
        }
      },
      {
        "@type": "Question",
        "name": `How close is ${hotelName} to popular attractions in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${hotelName} is centrally located with easy access to major attractions in ${city}.`
        }
      },
      {
        "@type": "Question",
        "name": `What time is check-in and check-out at ${hotelName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check-in is typically at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request."
        }
      },
      {
        "@type": "Question",
        "name": `Does ${hotelName} have a restaurant on-site?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the hotel features an on-site restaurant serving breakfast, lunch, and dinner."
        }
      },
      {
        "@type": "Question",
        "name": `Is ${hotelName} pet-friendly?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Please contact the hotel directly for their current pet policy and any associated fees."
        }
      },
      {
        "@type": "Question",
        "name": `What amenities are included in the room rate at ${hotelName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Room rates include access to Wi-Fi, fitness center, and basic amenities. Additional services may have extra charges."
        }
      },
      {
        "@type": "Question",
        "name": `Can I book ${hotelName} directly through InnstaStay?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can book ${hotelName} directly through InnstaStay with verified rates and no hidden fees or commissions."
        }
      }
    ]
  };
}

export function buildGeneralFAQJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is InnstaStay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "InnstaStay is a direct hotel booking platform that connects travelers with verified hotel rates, eliminating hidden fees and commissions."
        }
      },
      {
        "@type": "Question",
        "name": "How does InnstaStay save me money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By booking directly through InnstaStay, you avoid third-party commission fees and get access to verified direct rates from hotels."
        }
      },
      {
        "@type": "Question",
        "name": "Are the rates on InnstaStay guaranteed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all rates displayed on InnstaStay are verified and guaranteed. We work directly with hotels to ensure accurate pricing."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel or modify my booking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancellation and modification policies vary by hotel. Check the specific terms when booking or contact us for assistance."
        }
      },
      {
        "@type": "Question",
        "name": "Is my payment information secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we use industry-standard encryption to protect your payment information and never store sensitive data."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer customer support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our customer support team is available to help with bookings, modifications, and any questions you may have."
        }
      }
    ]
  };
}
