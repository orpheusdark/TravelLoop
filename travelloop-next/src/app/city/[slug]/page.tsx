import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function CityExplorationPage() {
  return (
    <PageShell title="City Exploration" subtitle="Neighborhood-by-neighborhood travel intelligence with crowd heatmaps, local events, and smart route overlays.">
      <div className="grid gap-4 lg:grid-cols-3">
        {["District radar", "Food clusters", "Night route"].map((item) => (
          <Card key={item}><CardContent><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-slate-300">Interactive map module and density layer.</p></CardContent></Card>
        ))}
      </div>
    </PageShell>
  );
}
