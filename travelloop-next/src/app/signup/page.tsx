"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const steps = ["Basic info", "Travel interests", "Budget", "Dream destinations", "Travel style", "AI personalization"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="mx-auto min-h-screen w-[min(960px,94%)] py-10">
      <Card className="glass p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Onboarding</p>
        <h1 className="mt-2 text-4xl font-semibold">Create your TravelLoop account</h1>
        <div className="mt-5 h-2 w-full rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-orange-300" style={{ width: `${progress}%` }} /></div>
        <p className="mt-2 text-sm text-slate-300">Step {step + 1} of {steps.length}: {steps[step]}</p>

        <div className="mt-6 space-y-4">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Full name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" className="sm:col-span-2" />
            </div>
          )}
          {step === 1 && <TagStep tags={["Nature", "Food", "History", "Nightlife", "Photography", "Roadtrip"]} />}
          {step === 2 && <TagStep tags={["<$1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000+"]} />}
          {step === 3 && <TagStep tags={["Kyoto", "Patagonia", "Iceland", "Lisbon", "Seoul", "Marrakech"]} />}
          {step === 4 && <TagStep tags={["Luxury", "Backpacker", "Balanced", "Digital Nomad", "Family"]} />}
          {step === 5 && <TagStep tags={["Weather-aware plans", "Budget optimization", "Local hidden gems", "Calm pace"]} />}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="glass" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Continue</Button>
          ) : (
            <Link href="/dashboard"><Button variant="sunset">Finish Setup</Button></Link>
          )}
        </div>
        <p className="mt-4 text-sm text-slate-300">Already registered? <Link href="/login" className="text-cyan-300">Login</Link></p>
      </Card>
    </div>
  );
}

function TagStep({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} className="cursor-pointer hover:bg-white/25">{tag}</Badge>
      ))}
    </div>
  );
}
