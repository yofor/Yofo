import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import { useAuth } from "../lib/auth";
import { useListings } from "../lib/listings";

export default function SellPage() {
  const { user } = useAuth();
  const { createListing } = useListings();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("new");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      void router.replace("/login");
    }
  }, [router, user]);

  if (!user) return null;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title || !price || !description || !city || !condition) {
      setError("All fields are required.");
      return;
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be a valid number.");
      return;
    }

    createListing({
      title,
      price: parsedPrice,
      description,
      city,
      condition,
      sellerEmail: user.email
    });

    void router.push("/listings");
  }

  return (
    <>
      <Head>
        <title>Sell | NaijaMarket</title>
      </Head>
      <AppNav />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Create listing</h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Price (₦)</span>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">City</span>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Condition</span>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white hover:bg-brand-700">Publish listing</button>
        </form>
      </main>
    </>
  );
}
