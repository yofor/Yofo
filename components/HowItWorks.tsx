const steps = [
  "Seller lists item with proof video",
  "Buyer chats and pays into escrow",
  "Seller commits and ships",
  "Buyer confirms or opens dispute"
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-bold text-slate-900">How a transaction works</h2>
      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {steps.map((step, idx) => (
          <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-semibold text-brand-700">STEP {idx + 1}</span>
            <p className="mt-1 font-medium text-slate-800">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
