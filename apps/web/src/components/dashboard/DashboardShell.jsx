"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function DashboardShell({ children }) {

const pathname = usePathname();

const navItem = (href, label) => (
<Link
href={href}
className={`transition-colors hover:text-cyan-400 ${
        pathname === href ? "text-cyan-400 font-semibold" : "text-gray-300"
      }`}
>
{label} </Link>
);

return ( <div className="flex min-h-screen bg-[#050816] text-white">


  {/* SIDEBAR */}
  <aside className="w-64 bg-black/40 border-r border-gray-800 p-6 hidden md:block">

    <h2 className="text-2xl text-cyan-400 mb-8 font-bold">
      IPR-Chain
    </h2>

    <nav className="flex flex-col gap-4">
      {navItem("/dashboard", "Overview")}
      {navItem("/dashboard/register", "Register IP")}
      {navItem("/dashboard/assets", "My Assets")}
      {navItem("/dashboard/verify", "Verify Ownership")}
      {navItem("/dashboard/activity", "Activity Log")}
      {navItem("/dashboard/analytics", "Analytics")}
    </nav>

  </aside>

  {/* MAIN AREA */}
  <div className="flex-1">

    {/* TOP NAVBAR */}
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">

      <h1 className="text-lg text-gray-300">
        Intellectual Property Registry
      </h1>

      <UserButton afterSignOutUrl="/" />

    </header>

    {/* PAGE CONTENT */}
    <main className="p-8">
      {children}
    </main>

  </div>

</div>

);
}
