import Head from "next/head";
import Link from "next/link";
import AppNav from "../components/AppNav";
import { useListings } from "../lib/listings";

export default function ListingsPage() {
  const { listings } = useListings();

  return (
    <>
      <Head>
        <title>Listings | NaijaMarket</title>
      </Head>
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">All listings</h1>
          <Link href="/sell" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            + Create listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No listings yet. Create your first one.
          </div>
        ) : (
          <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <article key={listing.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold text-slate-900">{listing.title}</h2>
                <p className="mt-1 text-lg font-bold text-brand-700">₦{listing.price.toLocaleString()}</p>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{listing.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{listing.city}</span>
                  <span>{listing.condition}</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
