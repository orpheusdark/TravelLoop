import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Theme, notifications, privacy, connected accounts, and AI personalization controls.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent><h3 className="font-semibold">Preferences</h3><p className="mt-2 text-sm text-slate-300">Dark mode, language, currency, timezone.</p></CardContent></Card>
        <Card><CardContent><h3 className="font-semibold">Privacy + Security</h3><p className="mt-2 text-sm text-slate-300">Session management, MFA, sharing permissions.</p></CardContent></Card>
      </div>
    </PageShell>
  );
}
