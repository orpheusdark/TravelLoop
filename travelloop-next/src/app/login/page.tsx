"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GitBranch, Apple, Globe, Quote, MapPin, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAppStore((state) => state.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.login({ email, password });
      setAuth(result.user, result.token);
      router.push("/dashboard");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1800&q=80"
          alt="Travel dashboard hero"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
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
          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
            <Input placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="inline-flex items-center gap-2"><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            <Button className="w-full" disabled={loading} type="submit">{loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}Sign in</Button>
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
