import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/card';
import { getActivityById } from '../services/activities';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    getActivityById(id).then((res) => setActivity(res.activity)).catch(console.error);
  }, [id]);

  if (!activity) return <p className="text-center text-slate-500">Loading…</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{activity.title}</h1>
        <Link to="/activities" className="text-sm text-brand-600">Back</Link>
      </div>
      <Card>
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div>
            <p className="text-sm text-slate-600">{activity.category} • {activity.duration} hr • {activity.estimatedCost} USD</p>
            <p className="mt-4 text-slate-700">{activity.description}</p>
          </div>
          <div className="h-64 w-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityDetailPage;
