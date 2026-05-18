import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  return (
    <PageShell title="Booking Workspace" subtitle="Premium booking flow for experiences, transport, and stays with smart pricing cues.">
      <Card><CardContent><h3 className="font-semibold">Selected Experience</h3><p className="mt-2 text-slate-300">Sunset Sailing + Coastal Dinner</p><p className="text-slate-300">$240 · 4 slots available</p><Button className="mt-4">Confirm Booking</Button></CardContent></Card>
    </PageShell>
  );
}
