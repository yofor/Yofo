export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight text-slate-900">NaijaMarket</div>
        <div className="hidden gap-6 text-sm text-slate-600 md:flex">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#start" className="hover:text-slate-900">Get started</a>
        </div>
        <button className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          Join Beta
        </button>
      </nav>
    </header>
  );
}
