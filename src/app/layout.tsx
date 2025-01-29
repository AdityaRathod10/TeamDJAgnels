import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import NotificationBell from '@/components/NotificationBell';
import VoiceIntro from '@/components/VoiceIntro';
import { CartProvider } from "@/context/CartContext";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickVeggie Market",
  description: "Find the best vegetable deals in your local market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <VoiceIntro />
        </CartProvider>
      </body>
    </html>
  );
}