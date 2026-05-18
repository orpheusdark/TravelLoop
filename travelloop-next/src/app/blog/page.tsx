import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <PageShell title="Travel Blog" subtitle="Editorial stories, local insights, and in-depth travel strategy content crafted by creators and travelers.">
      <div className="grid gap-4 md:grid-cols-2">
        {["The quiet villages of northern Japan", "How to optimize a 5-day Italy coastal run"].map((item) => (
          <Card key={item}><CardContent><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-slate-300">8 min read · curated editorial</p></CardContent></Card>
        ))}
      </div>
    </PageShell>
  );
}
