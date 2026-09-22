import type { Metadata, Viewport } from "next";
import { Cinzel, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";
import { WEDDING_CONFIG, getCoupleLabel } from "@/config/wedding";

const coupleLabel = getCoupleLabel();

// Load Google Fonts
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Configure SEO and Social Media Previews (Open Graph / Twitter)
export const metadata: Metadata = {
  metadataBase: new URL(WEDDING_CONFIG.siteUrl),
  title: WEDDING_CONFIG.title,
  description: WEDDING_CONFIG.description,
  keywords: [
    "Wedding Invitation",
    "Islamic Wedding",
    `${WEDDING_CONFIG.groom.name} and ${WEDDING_CONFIG.bride.name} Wedding`,
    "Online Invitation",
    "Luxury Wedding Website",
    "Nikah Invitation",
    "Walima Invitation",
  ],
  authors: [{ name: coupleLabel }],
  openGraph: {
    title: WEDDING_CONFIG.title,
    description: WEDDING_CONFIG.description,
    url: WEDDING_CONFIG.siteUrl,
    siteName: WEDDING_CONFIG.title,
    images: [
      {
        url: WEDDING_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${coupleLabel} Wedding Invitation`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: WEDDING_CONFIG.title,
    description: WEDDING_CONFIG.description,
    images: [WEDDING_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#241C26",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${greatVibes.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-gold-500 selection:text-luxury-black bg-luxury-black text-gold-100 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
