import "../lib/env";
import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans, Inter, Montserrat } from "next/font/google";

const fontSecondary = Montserrat({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["800"],
});
const fontPrimary = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Kalas - Frej Nils Frank",
    template: "%s - Frej Nils Frank",
  },
  description: "",
  themeColor: "hsl(15, 71%, 79%)",
  icons: {
    icon: "/favicon-16x16.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon.png",
    },
  },
  openGraph: {
    title: "Kalas för Frej Nils Frank",
    description: "",
    url: "https://frej.nilsfrank.se",
    siteName: "Kalas för Frej Nils Frank",
    images: [
      {
        url: "https://frej.nilsfrank.se/android-chrome-512x512.png",
        width: 48,
        height: 48,
      },
    ],
    locale: "sv-SE",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={clsx(fontPrimary.variable, fontSecondary.variable)}>
        {children}
      </body>
    </html>
  );
}
