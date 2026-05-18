import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <PageShell title="Community Feed" subtitle="Traveler reels, trip journals, social proof, and verified reviews in an inspiration-first stream.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["Reel: Porto rooftops", "Story: Kyoto alley photo walk", "Review: Patagonia basecamp"].map((item) => (
          <Card key={item}><CardContent><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-slate-300">Verified traveler · 4.9 rating</p></CardContent></Card>
        ))}
      </div>
    </PageShell>
  );
}
