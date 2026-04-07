import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import AppNav from "../components/AppNav";
import { useAuth } from "../lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(email.trim().toLowerCase(), password);
    if (!result.ok) {
      setError(result.error || "Could not sign up.");
      return;
    }

    void router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Sign up | NaijaMarket</title>
      </Head>
      <AppNav />
      <main className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600">Start buying and selling safely.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white hover:bg-brand-700">
            Sign up
          </button>

          <p className="text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-medium text-brand-700">Login</Link>
          </p>
        </form>
      </main>
    </>
  );
}
