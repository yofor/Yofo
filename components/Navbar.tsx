import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-slate-900">NaijaMarket</div>
        <div className="hidden gap-6 text-sm text-slate-600 md:flex">
          <Link href="/listings" className="hover:text-slate-900">Browse listings</Link>
          <Link href="/sell" className="hover:text-slate-900">Sell</Link>
          <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Login
          </Link>
          <Link href="/signup" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
