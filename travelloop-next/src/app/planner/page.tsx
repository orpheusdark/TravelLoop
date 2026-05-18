import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PlannerInterfacePage() {
  return (
    <PageShell title="AI Planner Interface" subtitle="Day-by-day timeline with weather adaptation, budget optimization, transport suggestions, and nearby attraction intelligence.">
      <Card><CardContent><h3 className="font-semibold">Planner Prompt</h3><p className="mt-2 text-slate-300">"7 days in Japan, food + heritage, moderate budget"</p><Button className="mt-4">Generate itinerary</Button></CardContent></Card>
    </PageShell>
  );
}
