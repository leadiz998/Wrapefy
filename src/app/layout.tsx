import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fake Wrapped Editor",
  description: "Create and download your own fake Spotify-style Wrapped cards.",
  icons: {
    icon: "/favicon.svg", // <- favicon ajouté ici aussi (optionnel)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* FAVICON */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
