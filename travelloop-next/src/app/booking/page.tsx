"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, LoaderCircle, Route } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tripApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import type { ActivitySummary, TripSummary } from "@/lib/types";

export default function BookingPage() {
  const token = useAppStore((state) => state.token);
  const activeTripId = useAppStore((state) => state.activeTripId);
  const [trip, setTrip] = useState<TripSummary | null>(null);
  const [activities, setActivities] = useState<ActivitySummary[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !activeTripId) return;

    const tripId = activeTripId;

    let active = true;

    async function loadTripWorkspace() {
      try {
        const [tripResponse, activityResponse] = await Promise.all([
          tripApi.getTrip(tripId, token),
          tripApi.getActivities("category=sightseeing&lat=35.6762&lon=139.6503&radius=12000")
        ]);

        if (!active) return;
        setTrip(tripResponse.trip);
        setActivities(activityResponse.activities.slice(0, 4));
        setSelectedActivityId((current) => current ?? activityResponse.activities[0]?.id ?? null);
      } catch (workspaceError) {
        if (!active) return;
        setError(workspaceError instanceof Error ? workspaceError.message : "Unable to load booking workspace");
      }
    }

    void loadTripWorkspace();

    return () => {
      active = false;
    };
  }, [activeTripId, token]);

  const selectedActivity = useMemo(() => activities.find((activity) => String(activity.id) === String(selectedActivityId)) ?? null, [activities, selectedActivityId]);

  async function handleConfirm() {
    if (!token || !trip || !selectedActivity) return;

    setLoading(true);
    setError(null);
    setConfirmation(null);

    try {
      await tripApi.addActivityToTrip(
        trip.id,
        {
          activity: selectedActivity,
          selectedDate: trip.startDate
        },
        token
      );

      setConfirmation(`Added ${selectedActivity.title} to ${trip.title}.`);
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Unable to confirm booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="Booking Workspace" subtitle="Premium booking flow for experiences, transport, and stays with smart pricing cues.">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent>
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-cyan-300" />
              <h3 className="font-semibold">Selected trip</h3>
            </div>
            {trip ? (
              <div className="mt-4 space-y-2">
                <p className="text-xl font-semibold">{trip.title}</p>
                <p className="text-sm text-slate-300">{trip.description}</p>
                <p className="text-sm text-slate-300">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <button
                      key={String(activity.id)}
                      type="button"
                      onClick={() => setSelectedActivityId(activity.id)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${String(selectedActivityId) === String(activity.id) ? "border-cyan-300 bg-cyan-300/20 text-cyan-100" : "border-white/15 bg-white/5 text-slate-200"}`}
                    >
                      {activity.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300">
                Create a trip in the planner first so it appears here.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold">Selected Experience</h3>
            {selectedActivity ? (
              <>
                <p className="mt-2 text-slate-300">{selectedActivity.title}</p>
                <p className="text-slate-300">${selectedActivity.estimatedCost} · {selectedActivity.rating} rating · {selectedActivity.duration}h</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{selectedActivity.category}</Badge>
                  <Badge>Live backend</Badge>
                </div>
              </>
            ) : (
              <p className="mt-2 text-slate-300">No activity loaded yet.</p>
            )}
            {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
            {confirmation ? <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" />{confirmation}</p> : null}
            <Button className="mt-4" onClick={handleConfirm} disabled={!trip || !selectedActivity || loading}>{loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}Confirm Booking</Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
