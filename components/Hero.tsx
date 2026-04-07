import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-700">
        Trust-first P2P commerce for Nigeria
      </p>
      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        Buy, sell, and earn online safely with escrow protection.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        NaijaMarket combines proof-of-access listings, secure payments, delivery tracking, and dispute-ready evidence in one platform.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/signup" className="rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
          Start buying safely
        </Link>
        <Link href="/sell" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Create listing
        </Link>
      </div>
    </section>
  );
}
