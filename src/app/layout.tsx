import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blood Heroes | Donate Blood, Save Lives",
  description:
    "Join Blood Heroes to donate blood, find donors, and save lives. Connect with a community dedicated to making a difference through blood donation.",
  keywords: [
    "blood donation",
    "blood donors",
    "save lives",
    "donate blood",
    "blood bank",
    "volunteer",
    "health",
    "community service",
  ],
  openGraph: {
    title: "Blood Heroes | Donate Blood, Save Lives",
    description:
      "Join Blood Heroes to donate blood, find donors, and save lives. Connect with a community dedicated to making a difference through blood donation.",
    url: "https://gmc-blood-heroes.vercel.app",
    siteName: "Blood Heroes",
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 512,
        alt: "Blood Heroes Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Heroes | Donate Blood, Save Lives",
    description: "Join Blood Heroes to donate blood, find donors, and save lives.",
    images: ["/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
