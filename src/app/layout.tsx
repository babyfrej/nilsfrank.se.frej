import { Analytics } from "@vercel/analytics/react";
import { Giraffe } from "@/components/giraffe";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../lib/env";
import "./globals.css";

const fontPrimary = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Kalas - Frej Nils Frank",
    template: "%s - Frej Nils Frank",
  },
  description: "",
  icons: {
    icon: "/icons/favicon-16x16.png",
    shortcut: "/icons/favicon-32x32.png",
    apple: "/icons/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icons/apple-touch-icon.png",
    },
  },
  openGraph: {
    title: "Kalas för Frej Nils Frank",
    description: "",
    url: "https://frej.nilsfrank.se",
    siteName: "Kalas för Frej Nils Frank",
    images: [
      {
        url: "https://frej.nilsfrank.se/icons/android-chrome-512x512.png",
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
      <body className={fontPrimary.className}>
        {children}
        <footer>
          <div
            className="main"
            style={{
              height: "300px",
              padding: "2rem",
              display: "flex",
              gap: "1rem",
              alignItems: "end",
              color: "color-mix(in lab, var(--bg-body), white 80%)",
            }}
          >
            <Giraffe />

            <div className="with-love">
              <h3>nilsfrank.se</h3>
              <span>Made with ❤️ by Niklas Frank</span>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
