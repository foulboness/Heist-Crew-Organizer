import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const stamp = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stamp",
});

export const metadata: Metadata = {
  title: "BLACKPRINT — Heist Crew Organizer",
  description: "Plan the job. Run the crew. Split the take.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} ${stamp.variable} font-mono`}>
        {children}
      </body>
    </html>
  );
}
