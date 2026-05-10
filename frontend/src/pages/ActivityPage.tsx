import { useEffect, useState } from 'react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { searchActivities } from '../services/activities';
import { useDebounce } from '../hooks/useDebounce';

const categories = [
  { label: 'Adventure', value: 'adventure' },
  { label: 'Food', value: 'food' },
  { label: 'Museums', value: 'museums' },
  { label: 'Nightlife', value: 'nightlife' },
  { label: 'Sightseeing', value: 'sightseeing' },
  { label: 'Nature', value: 'nature' }
];

const ActivityPage = () => {
  const [category, setCategory] = useState('sightseeing');
  const [activities, setActivities] = useState<any[]>([]);
  const [search, setSearch] = useState('Rome');
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const [lat, lon] = [41.9028, 12.4964];
    searchActivities({ lat, lon, category }).then((data) => setActivities(data.activities)).catch(console.error);
  }, [category]);

  useEffect(() => {
    if (!debouncedSearch) return;
    const [lat, lon] = [41.9028, 12.4964];
    searchActivities({ lat, lon, category }).then((data) => setActivities(data.activities)).catch(console.error);
  }, [category, debouncedSearch]);

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-950">Explore activities</h1>
        <p className="mt-3 text-slate-600">Find experiences for every stop in your itinerary — from culture to nightlife and nature escapes.</p>
      </div>

      <Card className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_200px]">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search destination" />
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
          </select>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {activities.map((activity) => (
          <Card key={activity.id} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{activity.category}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{activity.title}</h2>
              </div>
              <div className="h-40 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
            </div>
            <p className="text-slate-600">{activity.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{activity.estimatedCost} USD</span>
              <span>•</span>
              <span>{activity.duration} hr</span>
              <span>•</span>
              <span>{activity.rating} rating</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Button>Add activity</Button>
              <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">Save later</span>
            </div>
          </Card>
        ))}
      </div>
      {!activities.length && <p className="text-center text-slate-500">Fetching activity options for {search}...</p>}
    </div>
  );
};

export default ActivityPage;
