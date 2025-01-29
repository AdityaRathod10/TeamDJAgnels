'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Star,
  Leaf,
  Settings,
  LogOut
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function VendorNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: '/vendor/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { href: '/vendor/inventory', icon: Package, label: t('inventory') },
    { href: '/vendor/ratings', icon: Star, label: t('ratings') },
    { href: '/vendor/sustainability', icon: Leaf, label: t('sustainability') },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-600">QuickVeggie</h2>
        </div>

        {/* Main Navigation */}
        <ul className="space-y-2">
          {links.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(href)
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Actions */}
        <div className="fixed bottom-4 w-56 space-y-2">
          <Link
            href="/vendor/settings"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>{t('settings')}</span>
          </Link>
          <button
            onClick={() => {/* Add logout logic */}}
            className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
