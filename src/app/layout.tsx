import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Nothing_You_Could_Do } from "next/font/google";
import Link from "next/link";

const ibm_plex = IBM_Plex_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400"],
});
const nothing = Nothing_You_Could_Do({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Kalas - Frej Nils Frank",
    template: "%s - Frej Nils Frank",
  },
  description: "",
  themeColor: "#f5f5f5",
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
    title: "Dop för Frej Nils Frank",
    description: "",
    url: "https://frej.nilsfrank.se",
    siteName: "Dop för Frej Nils Frank",
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
      <body className={clsx(ibm_plex.variable, nothing.variable)}>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/"></Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
