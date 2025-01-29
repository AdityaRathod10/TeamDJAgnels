import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import NotificationBell from '@/components/NotificationBell';

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
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-green-600">
                QuickVeggie
              </Link>
              
              <div className="flex items-center gap-6">
                <Link href="/search" className="text-gray-600 hover:text-gray-800">
                  Search
                </Link>
                <Link href="/markets" className="text-gray-600 hover:text-gray-800">
                  Markets
                </Link>
                <Link href="/market-status" className="text-gray-600 hover:text-gray-800">
                  Live Status
                </Link>
                <Link href="/recommendations" className="text-gray-600 hover:text-gray-800">
                  For You
                </Link>
                <Link href="/wishlist" className="text-gray-600 hover:text-gray-800">
                  Wishlist
                </Link>
                <Link href="/bookings" className="text-gray-600 hover:text-gray-800">
                  My Bookings
                </Link>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-800">
                    Account
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/preferences" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Preferences
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-800">
                    Vendor
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/vendor/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/vendor/quick-update" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Quick Price Update
                    </Link>
                  </div>
                </div>
                <NotificationBell />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
