import { Analytics } from "@vercel/analytics/react";
import { Giraffe } from "@/components/giraffe";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import local from "next/font/local";
import Image from "next/image";
import "../lib/env";
import "./globals.css";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./layout.module.css"

const fontPrimary = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-primary",
});

const fontTertiary = local({
  src: "../../public/fonts/blue-custard.woff",
  variable: "--font-tertiary",
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
  children: ReactNode;
}) {
  return (
    <html
      lang="sv"
      className={clsx(fontPrimary.variable, fontTertiary.variable)}
    >
      <body>
        {children}
        <footer className={styles.footer}>
          <div
            className={clsx(styles.main, "main")}
          >
            <Image
              className={styles.blueyDancing}
              src="/images/bluey_dancing.webp"
              alt="Bluey Heeler dancing"
              width="103"
              height="120"
            />
            <Giraffe />

            <div className={styles.withLove}>
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
