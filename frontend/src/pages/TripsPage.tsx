import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrips, duplicateTrip } from '../services/trips';
import Card from '../components/ui/card';
import Button from '../components/ui/button';

const TripsPage = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrips().then((data) => setTrips(data.trips)).finally(() => setLoading(false));
  }, []);

  const onDuplicate = async (id: number) => {
    const response = await duplicateTrip(id);
    setTrips((prev) => [response.trip, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">My journeys</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Your trips</h1>
        </div>
        <Link to="/create-trip" className="inline-flex items-center justify-center rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500">New trip</Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 rounded-[28px] bg-slate-100" />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-950">No trips yet</h2>
            <p className="mt-3 text-slate-600">Create your first itinerary and invite your friends to the adventure.</p>
            <Link to="/create-trip" className="mt-6 inline-flex rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-500">Add trip</Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {trips.map((trip) => (
            <Card key={trip.id} className="grid gap-4 md:grid-cols-[1fr_220px] md:items-start">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{trip.visibility}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">{trip.title}</h2>
                  </div>
                  <div className="rounded-3xl bg-slate-100 px-3 py-1 text-sm text-slate-600">{trip.tripStops?.length ?? 0} stops</div>
                </div>
                <p className="text-slate-600">{trip.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                  <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{new Date(trip.endDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{trip.travelerCount} travellers</span>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Budget</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">${trip.budget}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <Link to="/builder" className="rounded-2xl bg-white px-3 py-2 text-center text-sm text-brand-600 shadow-sm">View</Link>
                  <button onClick={() => onDuplicate(trip.id)} className="rounded-2xl bg-brand-600 px-3 py-2 text-sm text-white">Duplicate</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
