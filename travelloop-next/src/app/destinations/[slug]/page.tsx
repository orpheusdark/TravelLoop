import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DestinationDetailsPage() {
  return (
    <PageShell title="Destination Details" subtitle="Cinematic destination intelligence with seasonal trends, local highlights, and itinerary hooks.">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden"><div className="h-72 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover" /><CardContent><h3 className="text-2xl font-semibold">Amalfi Coast</h3><p className="mt-2 text-slate-300">Live ratings, weather, estimated budget, and adaptive trip suggestions.</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Quick Actions</h3><div className="mt-3 space-y-2"><Button className="w-full">Add to planner</Button><Button variant="glass" className="w-full">Save destination</Button><Button variant="sunset" className="w-full">Start booking</Button></div></CardContent></Card>
      </div>
    </PageShell>
  );
}
