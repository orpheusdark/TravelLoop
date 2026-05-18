import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { getTrips } from '../services/trips';
import Card from '../components/ui/card';
import { useAuthStore } from '../hooks/useAuthStore';
import { motion } from 'framer-motion';
import OnboardingPulse from '../components/OnboardingPulse';

const DashboardPage = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getTrips().then((data) => setTrips(data.trips)).catch(console.error);
  }, []);

  const summary = useMemo(() => {
    const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0);
    const upcoming = trips.filter((trip) => new Date(trip.startDate) > new Date()).length;
    return { totalBudget, upcoming, totalTrips: trips.length };
  }, [trips]);

  return (
    <div className="space-y-8">
      {/* Onboarding pulse: shows a small guide near the Create button on first visit */}
      <OnboardingPulse />
      <section className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Hello {user?.name?.split(' ')[0] || 'traveller'}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Plan your next adventure with confidence.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Track budgets, build day-wise itineraries, and discover curated destinations in one premium dashboard.</p>
          </div>
          <Link to="/create-trip" className="inline-flex items-center justify-center rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500">Create new trip</Link>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <StatsCard title="Upcoming trips" value={String(summary.upcoming)} />
        <StatsCard title="Total planned budget" value={`$${summary.totalBudget.toLocaleString()}`} />
        <StatsCard title="Trips created" value={String(summary.totalTrips)} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-slate-500">Today’s insight</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Smart itinerary suggestions</h2>
            </div>
            <div className="rounded-3xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Live update</div>
          </div>
          <div className="space-y-4 text-slate-600">
            <p>Start faster with automatic city scoring, weather-aware routing, and curated activity bundles for each destination.</p>
            <p className="rounded-3xl bg-slate-50 p-5 text-sm">Traveloop surfaces the best stops, costs, and local highlights so every journey feels polished.</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Quick actions</h2>
            <span className="text-sm text-slate-500">Save time</span>
          </div>
          <div className="grid gap-3">
            <Link to="/discover" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-brand-200">Browse trending destinations</Link>
            <Link to="/activities" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-brand-200">Find local experiences</Link>
            <Link to="/analytics" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-brand-200">Review budget insights</Link>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Recent trips</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Synced</span>
          </div>
          <div className="space-y-3">
            {trips.slice(0, 3).map((trip, idx) => (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} whileHover={{ rotateY: 6, scale: 1.01 }} className="transform-style-preserve">
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-950">{trip.title}</p>
                    <p className="text-sm text-slate-500">{trip.tripStops?.length ?? 0} stops • {trip.visibility}</p>
                  </div>
                  <Link to={`/builder?tripId=${trip.id}`} className="text-sm font-semibold text-brand-600">Open</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4 bg-gradient-to-br from-slate-950 to-brand-700 text-white">
          <h2 className="text-xl font-semibold">Travel intelligence</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Best time</p>
              <p className="mt-2 text-lg font-semibold">September</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Weather</p>
              <p className="mt-2 text-lg font-semibold">Mild & clear</p>
            </div>
          </div>
          <p className="text-sm text-slate-200">Traveloop surfaces smart recommendations using city trends, budgets, and route quality.</p>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
