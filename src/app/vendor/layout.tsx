'use client';

import VendorNavigation from '@/components/VendorNavigation';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import React from "react"
import { usePathname } from "next/navigation"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  // Don't show sidebar on auth page
  if (pathname === "/vendor/auth") {
    return (
      <LanguageProvider>
        {children}
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen">
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {/* Navigation */}
            <VendorNavigation />
            
            {/* Main Content */}
            <main className="flex-1 p-8">
              <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="mb-8 flex justify-end">
                  <LanguageSelector />
                </div>
                
                {/* Page Content */}
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
