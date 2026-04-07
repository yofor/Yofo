import Head from "next/head";
import FeatureGrid from "../components/FeatureGrid";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>NaijaMarket | Trust-first P2P commerce</title>
        <meta
          name="description"
          content="Buy, sell, and earn safely in Nigeria with proof verification, escrow protection, and delivery tracking."
        />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main>
          <Hero />
          <FeatureGrid />
          <HowItWorks />

          <section id="start" className="mx-auto max-w-6xl px-6 py-14">
            <div className="rounded-2xl bg-slate-900 p-8 text-white">
              <h2 className="text-2xl font-bold">Ready to transact safer?</h2>
              <p className="mt-2 text-slate-300">
                Join early access and help shape the safest commerce network in Nigeria.
              </p>
              <a href="/signup" className="mt-6 inline-block rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Go to app
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
