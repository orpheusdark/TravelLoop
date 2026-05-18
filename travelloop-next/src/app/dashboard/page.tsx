import { Bell, Bot, Bookmark, CalendarRange, CloudSun, Wallet } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <PageShell title="Travel Intelligence Dashboard" subtitle="Saved destinations, upcoming trips, itinerary timeline, weather intelligence, AI assistant, and travel analytics in one operating view.">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardContent><h3 className="font-semibold">Upcoming Trips</h3><p className="mt-2 text-sm text-slate-300">Tokyo Loop · 12 Jun</p><p className="text-sm text-slate-300">Iceland Escape · 04 Sep</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Budget Tracker</h3><p className="mt-2 text-2xl font-semibold">$3,420</p><p className="text-sm text-emerald-300">12% under planned budget</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Weather Widget</h3><p className="mt-2 inline-flex items-center gap-2"><CloudSun className="h-4 w-4 text-cyan-300" />Kyoto · 16C</p></CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><CardContent><h3 className="font-semibold">Itinerary Timeline</h3><p className="mt-2 text-sm text-slate-300">Day 1 - Arrival + district walk</p><p className="text-sm text-slate-300">Day 2 - Culture + hidden cafes</p><p className="text-sm text-slate-300">Day 3 - Coastal route + food night</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold inline-flex items-center gap-2"><Bot className="h-4 w-4 text-cyan-300" />AI Assistant Panel</h3><p className="mt-2 text-sm text-slate-300">"Flight prices dropping in 48h. Shift departure by one day?"</p><Button variant="glass" className="mt-4">Apply recommendation</Button></CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Bookmark, label: "Bookmarks", value: "32" },
          { icon: CalendarRange, label: "Trip days", value: "44" },
          { icon: Wallet, label: "Budget score", value: "89" },
          { icon: Bell, label: "Notifications", value: "7" }
        ].map((item) => {
          const Icon = item.icon;
          return <Card key={item.label}><CardContent><Icon className="h-4 w-4 text-cyan-300" /><p className="mt-2 text-sm text-slate-300">{item.label}</p><p className="text-2xl font-semibold">{item.value}</p></CardContent></Card>;
        })}
      </div>
    </PageShell>
  );
}
