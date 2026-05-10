import { ResponsiveContainer, Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/card';

const budgetSeries = [
  { name: 'Day 1', budget: 120, spent: 98 },
  { name: 'Day 2', budget: 140, spent: 132 },
  { name: 'Day 3', budget: 170, spent: 185 },
  { name: 'Day 4', budget: 150, spent: 120 },
  { name: 'Day 5', budget: 180, spent: 162 }
];

const categoryData = [
  { name: 'Hotel', value: 40 },
  { name: 'Food', value: 25 },
  { name: 'Transport', value: 20 },
  { name: 'Activities', value: 15 }
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-950">Budget analytics</h1>
        <p className="mt-3 text-slate-600">Monitor spend, detect over-budget trends, and optimize your itinerary with dynamic cost insights.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Spending trend</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Daily budget vs actual</h2>
            </div>
            <span className="rounded-3xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Smart warning</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="spent" stroke="#4f46e5" fill="url(#colorSpent)" />
                <Area type="monotone" dataKey="budget" stroke="#0f172a" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cost split</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Where your budget goes</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} fill="#4f46e5" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">You are 12% over budget on day 3. Adjust activities or lodging to balance spend.</div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Transport costs are below expectation — great opportunity to upgrade experiences.</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
