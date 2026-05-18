import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <PageShell title="Traveler Profile" subtitle="Your travel identity, saved preferences, achievements, and personalized discovery graph.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent><h3 className="font-semibold">Profile</h3><p className="mt-2 text-slate-300">Ava M. · Luxury + Culture · 17 countries</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Travel Journal</h3><p className="mt-2 text-slate-300">Recent story: Morning street food in Osaka.</p></CardContent></Card>
      </div>
    </PageShell>
  );
}
