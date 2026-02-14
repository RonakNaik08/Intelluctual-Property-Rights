"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import NetworkIndicator from "./NetworkIndicator";
import WalletPreview from "./WalletPreview";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full border-b border-gray-800 bg-[#050816] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-black">
              I
            </div>
            <span className="text-xl font-semibold text-cyan-400">
              IPR-Chain
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-gray-300">
            <Link href="/" className="hover:text-cyan-400 transition">Home</Link>

            {isSignedIn && (
              <>
                <Link href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
                <Link href="/dashboard/register-ip" className="hover:text-cyan-400 transition">Register IP</Link>
                <Link href="/dashboard/my-assets" className="hover:text-cyan-400 transition">My Assets</Link>
              </>
            )}

            <Link href="/verify" className="hover:text-cyan-400 transition">
              Verify
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <NetworkIndicator />
          <WalletPreview />

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/sign-in"
              className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Sign In
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
