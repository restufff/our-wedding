import localFont from "next/font/local";
import "./globals.css";

const whispering = localFont({
  src: "./fonts/WhisperingSignature.ttf",
  variable: "--font-whispering",
});

export const viewport = {
  themeColor: "#366998",
};

export const metadata = {
  metadataBase: new URL("https://tr-invitation.my.id"),
  title: "The Wedding of Restu & Tanya — 28 Maret 2026",
  description:
    "Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.",
  keywords: [
    "undangan pernikahan",
    "wedding invitation",
    "Restu Fauzi",
    "Tanya Apriska Putri",
    "pernikahan 2026",
    "28 Maret 2026",
    "Bengkulu",
    "Seluma",
  ],
  authors: [{ name: "Restu & Tanya" }],
  robots: "index, follow",
  icons: {
    icon: "/image/fingerprint.png",
  },
  openGraph: {
    title: "The Wedding of Restu & Tanya ✨",
    description:
      "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.",
    url: "https://tr-invitation.my.id",
    siteName: "Undangan Pernikahan Restu & Tanya",
    images: [
      {
        url: "/image/metatag.png",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Restu & Tanya — 28 Maret 2026",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Restu & Tanya ✨",
    description:
      "Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.",
    images: ["/image/metatag.png"],
  },
};

import { Alegreya } from 'next/font/google';
import { LanguageProvider } from '@/app/context/LanguageContext';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${whispering.variable} ${alegreya.variable}`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
