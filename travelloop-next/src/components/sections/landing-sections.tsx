"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Globe,
  MapPinned,
  Sparkles,
  TrendingUp,
  Wallet,
  CloudSun,
  ShieldCheck,
  Star,
  Route,
  PlayCircle,
  Users,
  Plane,
  Calendar,
  Heart
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Destination, PlannerDay } from "@/lib/types";

const destinations: Destination[] = [
  {
    id: "iceland",
    name: "Iceland Highlands",
    country: "Iceland",
    category: "Mountains",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    weather: "8C clear",
    budget: 1800,
    duration: "6 days"
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    weather: "23C sunny",
    budget: 2200,
    duration: "5 days"
  },
  {
    id: "kyoto",
    name: "Kyoto Old District",
    country: "Japan",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    weather: "16C mild",
    budget: 2100,
    duration: "7 days"
  },
  {
    id: "patagonia",
    name: "Patagonia Trails",
    country: "Chile",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    weather: "12C windy",
    budget: 2500,
    duration: "8 days"
  },
  {
    id: "istanbul",
    name: "Istanbul Nights",
    country: "Turkey",
    category: "Food",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    weather: "19C breeze",
    budget: 1500,
    duration: "4 days"
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen Streets",
    country: "Morocco",
    category: "Hidden Gems",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    weather: "18C clear",
    budget: 1200,
    duration: "5 days"
  }
];

const plannerDays: PlannerDay[] = [
  { day: 1, title: "Arrival + Local Market", weather: "Cloudy", budget: "$220", highlights: ["Airport transfer", "Food lane walk", "Night district"] },
  { day: 2, title: "Culture + Hidden Cafes", weather: "Sunny", budget: "$180", highlights: ["Museum pass", "AI cafe picks", "Temple sunset"] },
  { day: 3, title: "Coastal Escape", weather: "Mild", budget: "$260", highlights: ["Rail route", "Beach brunch", "Golden hour photos"] }
];

const insights = [
  { icon: Plane, label: "Flight Trend", value: "-12%", delta: "week over week" },
  { icon: CloudSun, label: "Weather Confidence", value: "92%", delta: "next 10 days" },
  { icon: Users, label: "Crowd Level", value: "Medium", delta: "best after 6PM" },
  { icon: ShieldCheck, label: "Safety Score", value: "8.8/10", delta: "city center" }
];

const faqs = [
  {
    question: "How does AI itinerary generation work?",
    answer: "TravelLoop combines destination APIs, weather models, and budget heuristics with your preferences to generate adaptive day-by-day plans."
  },
  {
    question: "Can I collaborate with friends or travel groups?",
    answer: "Yes. You can share routes privately, co-edit notes, and publish selected moments to community spaces with permissions."
  },
  {
    question: "Does the planner support live travel changes?",
    answer: "It does. Delay alerts, weather shifts, and budget drift trigger instant recommendations to rebalance your plan."
  }
];

export function HeroSection() {
  return (
    <section className="mx-auto grid w-[min(1200px,94%)] gap-8 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal>
        <Badge className="text-cyan-200">AI-Driven Travel Ecosystem</Badge>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-7xl">Discover Places Beyond the Tourist Map</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">Plan, explore, and experience travel with intelligent recommendations, local insights, and real traveler communities.</p>
        <div className="mt-8 grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-4">
          <Input placeholder="Destination" />
          <Input placeholder="Budget" />
          <Input placeholder="Travel dates" />
          <Input placeholder="Interests" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="sunset" size="lg">Launch AI Planner</Button>
          <Button variant="glass" size="lg">Watch Platform Tour</Button>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Users className="h-4 w-4" /> 120k travelers planned this month
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[460px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-slate-900/80" />
              <motion.div className="absolute left-5 top-6 rounded-xl border border-white/20 bg-white/15 p-3 text-sm backdrop-blur" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                Weather: Tokyo 17C
              </motion.div>
              <motion.div className="absolute right-6 top-24 rounded-xl border border-white/20 bg-white/15 p-3 text-sm backdrop-blur" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
                Live route: 3,420 active
              </motion.div>
              <motion.div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-slate-950/60 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Global pulse</p>
                  <Globe className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-xl font-semibold">1.8M</p><p className="text-xs text-slate-300">Trips</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-xl font-semibold">96%</p><p className="text-xs text-slate-300">Satisfaction</p></div>
                  <div className="rounded-xl bg-white/10 p-3"><p className="text-xl font-semibold">340</p><p className="text-xs text-slate-300">Cities</p></div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

export function SmartSearchSection() {
  const chips = ["Weekend", "Family", "Remote Work", "Culture", "Food Crawl", "Nature", "Nightlife"];

  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Smart Search Experience</h2>
            <p className="mt-2 text-slate-300">Autocomplete, trending, recent activity, AI signals, and map-based filters in one flow.</p>
          </div>
          <Compass className="h-8 w-8 text-cyan-300" />
        </div>
      </Reveal>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Input placeholder="Search destination" />
              <Input placeholder="Activity selector" />
              <Input placeholder="Map radius" />
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Badge key={chip} className="cursor-pointer hover:bg-white/20">{chip}</Badge>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Card className="bg-white/5"><CardContent><p className="text-xs text-slate-400">Trending</p><p className="mt-1">Lisbon food alleys</p></CardContent></Card>
              <Card className="bg-white/5"><CardContent><p className="text-xs text-slate-400">Recent</p><p className="mt-1">Bali digital nomad</p></CardContent></Card>
              <Card className="bg-white/5"><CardContent><p className="text-xs text-slate-400">AI Rec</p><p className="mt-1">Seoul art + coffee</p></CardContent></Card>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80')] bg-cover opacity-35" />
          <CardContent className="relative h-full">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Map Discovery</p>
            <p className="mt-2 text-sm text-slate-300">Interactive routes and area heat mapping for traffic, events, and crowd intelligence.</p>
            <div className="mt-6 grid gap-2">
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FeaturedDestinationsSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <Reveal>
        <h2 className="text-3xl font-semibold md:text-4xl">Featured Destinations</h2>
      </Reveal>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((item, idx) => (
          <motion.div key={item.id} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
            <Card className="overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="absolute left-3 top-3"><Badge>{item.category}</Badge></div>
                <button className="absolute right-3 top-3 rounded-full bg-black/40 p-2"><Heart className="h-4 w-4" /></button>
              </div>
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <p className="text-sm text-slate-300">{item.country}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg bg-white/10 p-2"><Star className="mr-1 inline h-4 w-4 text-amber-300" /> {item.rating}</div>
                  <div className="rounded-lg bg-white/10 p-2"><CloudSun className="mr-1 inline h-4 w-4 text-cyan-300" /> {item.weather}</div>
                  <div className="rounded-lg bg-white/10 p-2"><Wallet className="mr-1 inline h-4 w-4 text-emerald-300" /> ${item.budget}</div>
                  <div className="rounded-lg bg-white/10 p-2"><Calendar className="mr-1 inline h-4 w-4 text-orange-300" /> {item.duration}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function WorldExplorationSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <Card className="overflow-hidden">
        <CardContent className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-[320px] rounded-2xl border border-white/20 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 to-transparent" />
            <motion.div className="absolute left-12 top-14 h-3 w-3 rounded-full bg-cyan-300" animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} />
            <motion.div className="absolute right-16 top-24 h-3 w-3 rounded-full bg-orange-300" animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.8 }} />
            <motion.div className="absolute bottom-16 left-1/2 h-3 w-3 rounded-full bg-emerald-300" animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.2 }} />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Interactive World Exploration</h2>
            <p className="mt-3 text-slate-300">Pseudo-3D globe feel with trend heatmaps, route density, and local events layered over your selected travel corridor.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-200">
              <p><MapPinned className="mr-2 inline h-4 w-4 text-cyan-300" /> Click destinations to inspect route load</p>
              <p><TrendingUp className="mr-2 inline h-4 w-4 text-emerald-300" /> Heatmap updates by seasonality and events</p>
              <p><Route className="mr-2 inline h-4 w-4 text-orange-300" /> Popular routes auto-suggested by community data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function AiPlannerSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <Reveal>
        <h2 className="text-3xl font-semibold md:text-4xl">AI Travel Planner</h2>
      </Reveal>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <CardContent>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Generation timeline</p>
            <div className="mt-4 space-y-3">
              {plannerDays.map((day, idx) => (
                <motion.div key={day.day} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="rounded-xl border border-white/20 bg-white/8 p-4">
                  <p className="text-sm text-cyan-200">Day {day.day}</p>
                  <p className="mt-1 font-medium">{day.title}</p>
                  <p className="text-sm text-slate-300">Weather: {day.weather} · Budget: {day.budget}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {day.highlights.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">AI simulation</p>
            <div className="mt-5 space-y-3">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.4 }} className="rounded-lg bg-white/10 p-3 text-sm">Optimizing transport connections...</motion.div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.8, delay: 0.2 }} className="rounded-lg bg-white/10 p-3 text-sm">Balancing budget by district demand...</motion.div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3, delay: 0.3 }} className="rounded-lg bg-white/10 p-3 text-sm">Injecting local event opportunities...</motion.div>
            </div>
            <Button variant="sunset" className="mt-5 w-full">Generate My Itinerary</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <h2 className="text-3xl font-semibold md:text-4xl">Community and Reviews</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Hidden ramen tour in Kyoto", "Sunrise hike in Madeira", "Art lane stories from Lisbon"].map((story, idx) => (
          <Card key={story} className="overflow-hidden">
            <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-15${idx + 10}3296635249-4ec9f88b9b?auto=format&fit=crop&w=900&q=70)` }} />
            <CardContent>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Verified traveler</p>
              <p className="mt-2 font-medium">{story}</p>
              <p className="mt-2 text-sm text-slate-300">4.{8 - idx} community rating · 2.{idx + 1}k views</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function MarketplaceSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <h2 className="text-3xl font-semibold md:text-4xl">Experience Marketplace</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Guided Tours", "Local Events", "Cultural Experiences", "Adventure + Food"].map((type) => (
          <Card key={type}>
            <CardContent>
              <p className="text-sm text-cyan-300">{type}</p>
              <p className="mt-2 text-lg font-medium">Starting at $79</p>
              <p className="mt-2 text-sm text-slate-300">Host verified · 24 slots left · 4.9 reviews</p>
              <Button variant="glass" className="mt-4 w-full">Quick book</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <h2 className="text-3xl font-semibold md:text-4xl">Real-Time Travel Insights</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.label}>
              <CardContent>
                <Icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-sm text-slate-300">{insight.label}</p>
                <p className="text-2xl font-semibold">{insight.value}</p>
                <p className="text-xs text-emerald-300">{insight.delta}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function MobileShowcaseSection() {
  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <Card>
        <CardContent className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto h-[430px] w-[220px] rounded-[2.2rem] border border-white/20 bg-slate-900/60 p-2">
            <div className="h-full rounded-[1.8rem] bg-gradient-to-b from-cyan-400/30 to-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Mobile app</p>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-14" />
                <Skeleton className="h-24" />
                <Skeleton className="h-20" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Mobile App Showcase</h2>
            <p className="mt-3 text-slate-300">Plan on desktop, continue on mobile with live maps, travel feed, AI assistant, and offline mode.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Trip planner", "Live maps", "Travel feed", "AI assistant", "Offline mode", "Smart notifications"].map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="sunset">App Store</Button>
              <Button variant="glass">Google Play</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    { name: "Explorer", price: "$0", desc: "Starter planning and saved destinations" },
    { name: "Nomad", price: "$19", desc: "AI itinerary engine and route optimization" },
    { name: "Elite Traveler", price: "$49", desc: "Advanced analytics, team collaboration, concierge lane" }
  ];

  return (
    <section className="mx-auto mt-20 w-[min(1200px,94%)]">
      <h2 className="text-3xl font-semibold md:text-4xl">Pricing</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <Card key={plan.name} className={idx === 1 ? "border-cyan-300/40 shadow-2xl shadow-cyan-500/20" : ""}>
            <CardContent>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{plan.name}</p>
              <p className="mt-2 text-4xl font-semibold">{plan.price}<span className="text-base text-slate-300">/mo</span></p>
              <p className="mt-2 text-sm text-slate-300">{plan.desc}</p>
              <Button variant={idx === 1 ? "sunset" : "glass"} className="mt-5 w-full">Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="mx-auto mt-20 w-[min(900px,94%)] pb-20">
      <h2 className="text-3xl font-semibold md:text-4xl">FAQ</h2>
      <div className="mt-5">
        <Accordion items={faqs} />
      </div>
    </section>
  );
}

export function ScrollProgress() {
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyan-300 via-emerald-300 to-orange-300"
      style={{ scaleX: 1 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
    />
  );
}

export function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {[...Array.from({ length: 16 })].map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/50"
          style={{ left: `${(idx * 7) % 100}%`, top: `${(idx * 13) % 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 4 + (idx % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <section className="mx-auto mt-8 w-[min(1200px,94%)]">
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-sm text-slate-200">
        <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Trusted by 8,000+ travel teams</span>
        <span className="inline-flex items-center gap-2"><PlayCircle className="h-4 w-4 text-cyan-300" /> 1.2M AI itineraries generated</span>
        <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-300" /> 4.9 avg platform rating</span>
      </div>
    </section>
  );
}
