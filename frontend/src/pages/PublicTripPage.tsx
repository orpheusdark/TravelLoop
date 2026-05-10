import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/card';
import api from '../services/api';

const PublicTripPage = () => {
  const { shareId } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (!shareId) return;
    api.get(`/public/${shareId}`).then((res) => setTrip(res.data.trip)).catch(console.error);
  }, [shareId]);

  if (!trip) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4 py-20">
        <Card className="max-w-xl text-center">
          <h1 className="text-3xl font-semibold text-slate-950">Loading itinerary…</h1>
          <p className="mt-4 text-slate-600">Fetching the shared journey and timeline details.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <Card className="overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Shared itinerary</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950">{trip.title}</h1>
              <p className="mt-4 text-slate-600">{trip.description}</p>
            </div>
            <div className="rounded-[32px] bg-slate-950 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Budget</p>
              <p className="mt-4 text-4xl font-semibold">${trip.budget}</p>
              <p className="mt-4 text-sm text-slate-300">Shared public preview. Copy the URL to share with teammates.</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {trip.tripStops?.map((stop: any) => (
            <Card key={stop.id} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{stop.cityId ? `Stop #${stop.orderIndex + 1}` : 'Stop'}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{stop.notes || 'City stop details'}</h2>
                </div>
                <span className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{new Date(stop.arrivalDate).toLocaleDateString()} – {new Date(stop.departureDate).toLocaleDateString()}</span>
              </div>
              <div className="text-slate-600">Pinned activities: {stop.activities?.length || 0}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicTripPage;
