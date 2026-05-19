"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

export default function DestinationDetailsPage() {
  const router = useRouter();
  const setPendingDestination = useAppStore((state) => state.setPendingDestination);
  const saveDestination = useAppStore((state) => state.saveDestination);
  const addRecentSearch = useAppStore((state) => state.addRecentSearch);
  const [message, setMessage] = useState<string | null>(null);

  function handleAddToPlanner() {
    const destination = "Amalfi Coast";
    setPendingDestination(destination);
    addRecentSearch(destination);
    setMessage(`${destination} queued for the planner.`);
    router.push("/planner");
  }

  function handleSaveDestination() {
    const destination = "Amalfi Coast";
    saveDestination(destination);
    setMessage(`${destination} saved to your destinations.`);
  }

  return (
    <PageShell title="Destination Details" subtitle="Cinematic destination intelligence with seasonal trends, local highlights, and itinerary hooks.">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden"><div className="relative h-72"><Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Amalfi Coast" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div><CardContent><h3 className="text-2xl font-semibold">Amalfi Coast</h3><p className="mt-2 text-slate-300">Live ratings, weather, estimated budget, and adaptive trip suggestions.</p>{message ? <p className="mt-3 text-sm text-emerald-300">{message}</p> : null}</CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Quick Actions</h3><div className="mt-3 space-y-2"><Button className="w-full" onClick={handleAddToPlanner}>Add to planner</Button><Button variant="glass" className="w-full" onClick={handleSaveDestination}>Save destination</Button><Button variant="sunset" className="w-full" onClick={() => router.push("/booking")}>Start booking</Button></div></CardContent></Card>
      </div>
    </PageShell>
  );
}
