import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/listings", label: "Listings" },
  { href: "/sell", label: "Sell" }
];

export default function AppNav() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-slate-900">NaijaMarket</Link>

        <nav className="flex items-center gap-4 text-sm">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={router.pathname === item.href ? "font-semibold text-brand-700" : "text-slate-600 hover:text-slate-900"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {user ? <span className="hidden text-slate-600 md:inline">{user.email}</span> : null}
          {user ? (
            <button
              className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              onClick={() => {
                logout();
                void router.push("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-md bg-brand-500 px-3 py-1.5 text-white hover:bg-brand-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
