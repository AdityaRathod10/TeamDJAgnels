"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, LogOut, User } from "lucide-react"
import NotificationBell from "@/components/NotificationBell"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { auth } from "@/lib/firebase/auth"
import { signOut } from "firebase/auth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleCartClick = () => {
    if (!user) {
      router.push("/login")
    } else {
      router.push("/cart")
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-green-600">
            QuickVeggie
          </Link>

          {/* Hamburger menu button for mobile */}
          <button className="lg:hidden text-gray-600 focus:outline-none" aria-label="Open menu" onClick={toggleMenu}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/search" className="text-gray-600 hover:text-gray-800">
              Search
            </Link>
            <Link href="/markets" className="text-gray-600 hover:text-gray-800">
              Markets
            </Link>
            <Link href="/my-vegetables" className="text-gray-600 hover:text-gray-800">
              For You
            </Link>
            <Link href="/bookings" className="text-gray-600 hover:text-gray-800">
              My Bookings
            </Link>

            {/* User section */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                {user ? (
                  <span className="text-sm">{user.email?.split("@")[0]}</span>
                ) : (
                  <span className="text-sm">Account</span>
                )}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {user ? (
                  <>
                    <Link href="/preferences" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Preferences
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>
                )}
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-800">Vendor</button>
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

            <button onClick={handleCartClick} className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/search"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Search
          </Link>
          <Link
            href="/markets"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Markets
          </Link>
          <Link
            href="/market-status"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Live Status
          </Link>
          <Link
            href="/recommendations"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            For You
          </Link>
          <Link
            href="/my-vegetables"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Wishlist
          </Link>
          <Link
            href="/bookings"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            My Bookings
          </Link>
          <Link
            href="/preferences"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            My Preferences
          </Link>
          <Link
            href="/vendor/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Vendor Dashboard
          </Link>
          <Link
            href="/vendor/quick-update"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Quick Price Update
          </Link>

          {user ? (
            <>
              <div className="px-3 py-2 text-base font-medium text-gray-700">Signed in as: {user.email}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={handleCartClick}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart ({cart.length})
          </button>
        </div>
      </div>
    </nav>
  )
}

