import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FooterCta() {
  return (
    <section className="mx-auto w-[min(1200px,94%)] py-20">
      <div className="glass rounded-3xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">TravelLoop</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Your next story starts here.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Build intelligent routes, discover local experiences, and travel with confidence powered by real-time insight.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup"><Button variant="sunset" size="lg">Start Free</Button></Link>
          <Link href="/dashboard"><Button variant="glass" size="lg">View Dashboard</Button></Link>
        </div>
      </div>
    </section>
  );
}
