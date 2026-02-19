import localFont from "next/font/local";
import "./globals.css";

const whispering = localFont({
  src: "./fonts/WhisperingSignature.ttf",
  variable: "--font-whispering",
});

export const metadata = {
  metadataBase: new URL("https://tr-invitation.my.id"),
  title: "The Wedding of Restu & Tanya",
  description: "We invite you to share in our joy at our wedding ceremony.",
  icons: {
    icon: "/image/fingerprint.png",
  },
  openGraph: {
    title: "The Wedding of Restu & Tanya",
    description: "We invite you to share in our joy at our wedding ceremony.",
    url: "https://tr-invitation.my.id",
    siteName: "Restu & Tanya Wedding",
    images: [
      {
        url: "/image/metatag.png",
        width: 1200,
        height: 630,
        alt: "Restu & Tanya Wedding Invitation",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Restu & Tanya",
    description: "We invite you to share in our joy at our wedding ceremony.",
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
