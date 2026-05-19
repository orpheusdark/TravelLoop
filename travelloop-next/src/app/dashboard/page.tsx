"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Bot, Bookmark, CalendarRange, CloudSun, Wallet } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tripApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import type { TripSummary, ActivitySummary } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const token = useAppStore((state) => state.token);
  const user = useAppStore((state) => state.user);
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [activities, setActivities] = useState<ActivitySummary[]>([]);

  useEffect(() => {
    if (!token) return;

    let active = true;

    async function loadDashboard() {
      try {
        const [tripResponse, activityResponse] = await Promise.all([
          tripApi.getTrips(token),
          tripApi.getActivities("category=sightseeing&lat=35.6762&lon=139.6503&radius=12000")
        ]);

        if (!active) return;
        setTrips(tripResponse.trips);
        setActivities(activityResponse.activities.slice(0, 3));
      } catch {
        if (!active) return;
        setTrips([]);
        setActivities([]);
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <PageShell title="Travel Intelligence Dashboard" subtitle="Saved destinations, upcoming trips, itinerary timeline, weather intelligence, AI assistant, and travel analytics in one operating view.">
      {user ? <p className="mb-4 text-sm text-slate-300">Welcome back, {user.name}. Your live backend data is loaded below.</p> : null}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardContent><h3 className="font-semibold">Upcoming Trips</h3>{trips.length ? trips.slice(0, 3).map((trip) => <p key={trip.id} className="mt-2 text-sm text-slate-300">{trip.title} · {new Date(trip.startDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>) : <p className="mt-2 text-sm text-slate-300">No trips yet. Create one from the planner.</p>}</CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Budget Tracker</h3><p className="mt-2 text-2xl font-semibold">$3,420</p><p className="text-sm text-emerald-300">12% under planned budget</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Weather Widget</h3><p className="mt-2 inline-flex items-center gap-2"><CloudSun className="h-4 w-4 text-cyan-300" />Kyoto · 16C</p></CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><CardContent><h3 className="font-semibold">Itinerary Timeline</h3><p className="mt-2 text-sm text-slate-300">Day 1 - Arrival + district walk</p><p className="text-sm text-slate-300">Day 2 - Culture + hidden cafes</p><p className="text-sm text-slate-300">Day 3 - Coastal route + food night</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold inline-flex items-center gap-2"><Bot className="h-4 w-4 text-cyan-300" />AI Assistant Panel</h3><p className="mt-2 text-sm text-slate-300">"Flight prices dropping in 48h. Shift departure by one day?"</p><Button variant="glass" className="mt-4" onClick={() => router.push("/planner")}>Apply recommendation</Button></CardContent></Card>
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

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {activities.map((activity) => (
          <Card key={String(activity.id)}>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Live activity</p>
              <h3 className="mt-2 font-semibold">{activity.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{activity.description}</p>
              <p className="mt-3 text-sm text-slate-300">{activity.category} · ${activity.estimatedCost} · {activity.duration}h</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
