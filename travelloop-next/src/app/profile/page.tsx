"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { authApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import type { AuthUser } from "@/lib/types";

export default function ProfilePage() {
  const token = useAppStore((state) => state.token);
  const storedUser = useAppStore((state) => state.user);
  const [user, setUser] = useState<AuthUser | null>(storedUser);

  useEffect(() => {
    if (!token) return;

    let active = true;
    void authApi.profile(token)
      .then((response) => {
        if (active) setUser(response.user);
      })
      .catch(() => {
        if (active) setUser(storedUser);
      });

    return () => {
      active = false;
    };
  }, [storedUser, token]);

  return (
    <PageShell title="Traveler Profile" subtitle="Your travel identity, saved preferences, achievements, and personalized discovery graph.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent><h3 className="font-semibold">Profile</h3><p className="mt-2 text-slate-300">{user ? `${user.name} · ${user.email}` : "Sign in to load your profile."}</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Travel Journal</h3><p className="mt-2 text-slate-300">Recent story: Morning street food in Osaka.</p></CardContent></Card>
      </div>
    </PageShell>
  );
}
