const features = [
  {
    title: "Proof-of-access listings",
    description: "Every seller includes a proof video with a dynamic code so buyers can verify real product access."
  },
  {
    title: "Escrow-first checkout",
    description: "Payments are held and only released when the buyer confirms delivery or dispute is resolved."
  },
  {
    title: "Structured delivery flow",
    description: "Track pickup, transit, and confirmation milestones with logs that support disputes."
  },
  {
    title: "Seller reliability score",
    description: "Performance-based scoring helps serious sellers stand out and reduces repeat scam risk."
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-bold text-slate-900">Core MVP capabilities</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
