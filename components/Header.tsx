"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { LogoutButton } from "@/components/auth/LogoutButton";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { user, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-decoration-none">
            <span className="text-2xl">🕉️</span>
            <span className="font-serif font-bold text-secondary text-xl hidden sm:block">
              Vedic Origins
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/#shop"
              className="text-darkBrown hover:text-primary font-medium text-sm transition-colors hidden sm:block"
            >
              Shop
            </Link>

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-lg border border-accent text-secondary hover:bg-cream transition-colors text-sm font-medium"
                >
                  <span className="text-base">👤</span>
                  <span className="hidden sm:block max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <span className="text-xs">▾</span>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-darkBrown truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-darkBrown hover:bg-cream transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-darkBrown hover:bg-cream transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <LogoutButton />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="min-h-[44px] flex items-center px-4 py-2 rounded-lg border border-accent text-secondary hover:bg-cream transition-colors text-sm font-medium"
              >
                <span className="mr-2">👤</span> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
