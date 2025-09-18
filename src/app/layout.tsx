import { TempoInit } from "@/components/tempo-init";
import { ReportsProvider } from "@/contexts/ReportsContext";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "BiteBase Intelligence",
  description: "A modern full-stack starter template powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" /> [deprecated] */}
      <head>
        {/* Add Google Fonts (JetBrains Mono) */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <ReportsProvider>
          {children}
        </ReportsProvider>
        <TempoInit />
      </body>
    </html>
  );
}
