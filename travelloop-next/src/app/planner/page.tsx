"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarRange, Compass, LoaderCircle, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tripApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import type { ActivitySummary, TripSummary } from "@/lib/types";

export default function PlannerInterfacePage() {
  const router = useRouter();
  const token = useAppStore((state) => state.token);
  const pendingDestination = useAppStore((state) => state.pendingDestination);
  const setActiveTripId = useAppStore((state) => state.setActiveTripId);
  const setPendingDestination = useAppStore((state) => state.setPendingDestination);
  const [destination, setDestination] = useState("Japan");
  const [interests, setInterests] = useState("food + heritage");
  const [budget, setBudget] = useState("moderate");
  const [loading, setLoading] = useState(false);
  const [createdTrip, setCreatedTrip] = useState<TripSummary | null>(null);
  const [recommendedActivities, setRecommendedActivities] = useState<ActivitySummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pendingDestination) {
      setDestination(pendingDestination);
      setPendingDestination(null);
    }
  }, [pendingDestination, setPendingDestination]);

  const prompt = useMemo(() => `${destination.trim() || "Japan"}, ${interests.trim() || "food + heritage"}, ${budget.trim() || "moderate"} budget`, [destination, interests, budget]);

  async function handleGenerate() {
    if (!token) {
      setError("Sign in first so the planner can save your trip.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const tripResponse = await tripApi.createTrip(
        {
          title: `${destination || "Japan"} Explorer Loop`,
          description: `Auto-generated itinerary for ${prompt}.`,
          startDate: "2026-06-12",
          endDate: "2026-06-19",
          travelerCount: 2,
          budget: budget === "luxury" ? 6000 : budget === "moderate" ? 3200 : 1800,
          coverImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1400&q=80",
          visibility: "private"
        },
        token
      );

      const activityResponse = await tripApi.getActivities("category=sightseeing&lat=35.6762&lon=139.6503&radius=12000");
      setCreatedTrip(tripResponse.trip);
      setRecommendedActivities(activityResponse.activities.slice(0, 4));
      setActiveTripId(tripResponse.trip.id);
      setPendingDestination(null);
      router.push("/booking");
    } catch (plannerError) {
      setError(plannerError instanceof Error ? plannerError.message : "Unable to generate itinerary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="AI Planner Interface" subtitle="Day-by-day timeline with weather adaptation, budget optimization, transport suggestions, and nearby attraction intelligence.">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Planner prompt</p>
              <h3 className="mt-2 text-2xl font-semibold">Create a live trip</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Destination" />
              <Input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Budget style" />
              <Input className="sm:col-span-2" value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="Interests" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>AI optimized</Badge>
              <Badge>Weather aware</Badge>
              <Badge>Budget synced</Badge>
              <Badge>Backend saved</Badge>
            </div>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{prompt}</p>
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            <Button onClick={handleGenerate} disabled={loading}>{loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Generate itinerary</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-cyan-300" />
              <h3 className="font-semibold">Generated preview</h3>
            </div>
            {createdTrip ? (
              <div className="mt-4 space-y-3">
                <p className="text-lg font-semibold">{createdTrip.title}</p>
                <p className="text-sm text-slate-300">Trip ID {createdTrip.id} · {new Date(createdTrip.startDate).toLocaleDateString()} to {new Date(createdTrip.endDate).toLocaleDateString()}</p>
                <p className="text-sm text-slate-300">Budget ${createdTrip.budget.toLocaleString()}</p>
                <div className="grid gap-2">
                  {recommendedActivities.map((activity) => (
                    <div key={String(activity.id)} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-slate-300">{activity.category} · ${activity.estimatedCost} · {activity.duration}h</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300">
                Generate a trip and the live backend itinerary will be saved here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
