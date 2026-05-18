import { Navbar } from "@/components/layout/navbar";

export function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mesh-bg" />
      <Navbar />
      <main className="relative mx-auto w-[min(1200px,94%)] py-10">
        <header className="mb-8 rounded-3xl border border-white/20 bg-white/8 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-300">{subtitle}</p>
        </header>
        {children}
      </main>
    </div>
  );
}
