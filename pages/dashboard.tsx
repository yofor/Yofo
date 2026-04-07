import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppNav from "../components/AppNav";
import { useAuth } from "../lib/auth";

const quickLinks = [
  { href: "/sell", label: "Create listing" },
  { href: "/listings", label: "View listings" },
  { href: "/dashboard?tab=orders", label: "Orders" },
  { href: "/dashboard?tab=messages", label: "Messages" }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      void router.replace("/login");
    }
  }, [router, user]);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Dashboard | NaijaMarket</title>
      </Head>
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-600">Signed in as {user.email}</p>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 bg-white p-5 font-medium text-slate-800 shadow-sm hover:border-brand-500 hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
