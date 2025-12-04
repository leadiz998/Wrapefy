import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";  // ⭐ pour Umami
import { Analytics } from "@vercel/analytics/react"; // ⭐ correct import

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fake Wrapped Editor",
  description: "Create and download your own fake Spotify-style Wrapped cards.",
  icons: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ⭐ UMAMI Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="dd4a0c65-2628-40d4-84a4-8cfbcd640397"
        />
      </head>

      <body className={font.className}>
        {children}

        {/* ⭐ Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
