import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fake Wrapped Editor",
  description: "Create and download your own fake Spotify-style Wrapped cards.",
  icons: [
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon.ico" }, // fallback si un jour tu veux en mettre un
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
