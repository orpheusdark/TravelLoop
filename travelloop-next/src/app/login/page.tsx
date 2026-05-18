"use client";

import Link from "next/link";
import { GitBranch, Apple, Globe, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-cyan-900/45 to-orange-600/35" />
        <div className="relative p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs"><Quote className="h-3 w-3" />Travel is the only upgrade that makes you richer.</p>
          <h1 className="mt-8 max-w-lg text-5xl font-semibold">Welcome back to your intelligent travel command center.</h1>
          <div className="mt-8 flex flex-wrap gap-2 text-sm">
            {["Iceland", "Kyoto", "Marrakech", "Patagonia"].map((tag, idx) => (
              <motion.span key={tag} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3 + idx }} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur"><MapPin className="h-3 w-3" />{tag}</motion.span>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="glass w-full max-w-md p-6">
          <h2 className="text-3xl font-semibold">Login to TravelLoop</h2>
          <p className="mt-2 text-sm text-slate-300">Access your trips, AI planner, and travel insights.</p>
          <form className="mt-6 space-y-3">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="inline-flex items-center gap-2"><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            <Button className="w-full">Sign in</Button>
          </form>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Button variant="glass" size="sm"><Globe className="mr-1 h-4 w-4" />Google</Button>
            <Button variant="glass" size="sm"><GitBranch className="mr-1 h-4 w-4" />GitHub</Button>
            <Button variant="glass" size="sm"><Apple className="mr-1 h-4 w-4" />Apple</Button>
          </div>
          <p className="mt-5 text-sm text-slate-300">No account yet? <Link className="text-cyan-300" href="/signup">Create one</Link></p>
        </Card>
      </section>
    </div>
  );
}
