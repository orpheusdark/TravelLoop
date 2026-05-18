import { useEffect, useMemo, useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { SortableTripStop } from '../components/SortableTripStop';
import { addStop, deleteStop, reorderStops } from '../services/stops';
import { getTrip, getTrips } from '../services/trips';

const BuilderPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trips, setTrips] = useState<any[]>([]);
  const [trip, setTrip] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({ cityName: '', arrivalDate: '', departureDate: '', notes: '' });
  const sensors = useSensors(useSensor(PointerSensor));

  const activeTripId = Number(searchParams.get('tripId') || trips[0]?.id || 0);

  useEffect(() => {
    getTrips()
      .then((data) => {
        setTrips(data.trips || []);
        if (!searchParams.get('tripId') && data.trips?.[0]?.id) {
          setSearchParams({ tripId: String(data.trips[0].id) }, { replace: true });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeTripId) return;
    getTrip(activeTripId).then((data) => {
      setTrip(data.trip);
      setSelectedStopId(data.trip?.tripStops?.[0]?.id ?? null);
    }).catch(console.error);
  }, [activeTripId]);

  const stops = trip?.tripStops || [];
  const selectedStop = stops.find((stop: any) => stop.id === selectedStopId) || stops[0] || null;

  const selectedTripSummary = useMemo(() => {
    const cityCount = new Set(stops.map((stop: any) => stop.cityName || stop.city?.name).filter(Boolean)).size;
    const durationDays = trip ? Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
    const estimatedSpent = Math.round(stops.reduce((sum: number, stop: any) => sum + ((stop.activities || []).reduce((activitySum: number, item: any) => activitySum + Number(item.activity?.estimatedCost || 0), 0)), 0));
    return { cityCount, durationDays, estimatedSpent };
  }, [stops, trip]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stops.findIndex((item: any) => String(item.id) === String(active.id));
    const newIndex = stops.findIndex((item: any) => String(item.id) === String(over.id));
    const updatedStops = arrayMove(stops, oldIndex, newIndex).map((stop: any, index: number) => ({ ...stop, orderIndex: index }));
    setTrip((current: any) => ({ ...current, tripStops: updatedStops }));
    await reorderStops(updatedStops.map((stop: any) => ({ id: stop.id, orderIndex: stop.orderIndex })));
  };

  const addNewStop = async () => {
    if (!activeTripId || !formValues.cityName || !formValues.arrivalDate || !formValues.departureDate) return;

    await addStop({
      tripId: activeTripId,
      cityName: formValues.cityName,
      arrivalDate: formValues.arrivalDate,
      departureDate: formValues.departureDate,
      orderIndex: stops.length,
      notes: formValues.notes
    });

    setFormValues({ cityName: '', arrivalDate: '', departureDate: '', notes: '' });
    const refreshed = await getTrip(activeTripId);
    setTrip(refreshed.trip);
  };

  const removeCurrentStop = async (stopId: number) => {
    await deleteStop(stopId);
    const refreshed = await getTrip(activeTripId);
    setTrip(refreshed.trip);
    setSelectedStopId(refreshed.trip?.tripStops?.[0]?.id ?? null);
  };

  if (loading) {
    return <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">Loading itinerary…</div>;
  }

  if (!trips.length) {
    return (
      <Card className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600">No trips yet</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Create a trip first</h1>
        <p className="mt-3 text-slate-600">The itinerary builder works after you create a trip.</p>
        <Button onClick={() => navigate('/create-trip')} className="mt-6">Create trip</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border border-white/50 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-700 text-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Itinerary builder</p>
            <h1 className="mt-2 text-4xl font-semibold">Design a cinematic travel flow.</h1>
            <p className="mt-4 max-w-2xl text-slate-200">Drag stops, add notes, and keep the full journey synchronized with your travel budget and public share preview.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {trips.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSearchParams({ tripId: String(item.id) })}
                  className={`rounded-full px-4 py-2 text-sm transition ${item.id === activeTripId ? 'bg-white text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Cities</p>
              <p className="mt-3 text-3xl font-semibold">{selectedTripSummary.cityCount}</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Days</p>
              <p className="mt-3 text-3xl font-semibold">{selectedTripSummary.durationDays}</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Activities</p>
              <p className="mt-3 text-3xl font-semibold">{stops.reduce((sum: number, stop: any) => sum + (stop.activities?.length || 0), 0)}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Timeline</h2>
              <p className="text-sm text-slate-500">Reorder the route and keep each stop aligned with your travel days.</p>
            </div>
            <span className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{stops.length} stops</span>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={stops.map((stop: any) => String(stop.id))} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {stops.map((stop: any) => (
                  <SortableTripStop
                    key={stop.id}
                    id={String(stop.id)}
                    stop={stop}
                    onSelect={() => setSelectedStopId(stop.id)}
                    onDelete={() => removeCurrentStop(stop.id)}
                    selected={selectedStopId === stop.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="grid gap-4 rounded-[28px] bg-slate-50 p-5 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Calendar view</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {stops.map((stop: any) => (
                  <div key={stop.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span>{stop.cityName || stop.city?.name || 'City stop'}</span>
                    <span>{new Date(stop.arrivalDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Selected stop</p>
              <div className="mt-3 rounded-[24px] bg-white p-5 shadow-sm">
                {selectedStop ? (
                  <>
                    <h3 className="text-2xl font-semibold text-slate-950">{selectedStop.cityName || selectedStop.city?.name || 'Stop details'}</h3>
                    <p className="mt-3 text-slate-600">{selectedStop.notes || 'No notes added yet.'}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-3 py-1">{new Date(selectedStop.arrivalDate).toLocaleDateString()}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{new Date(selectedStop.departureDate).toLocaleDateString()}</span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">{selectedStop.activities?.length || 0} activities</span>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">Select a stop to inspect its itinerary details.</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Add a new stop</h2>
            <p className="text-sm text-slate-500">Use a city name directly, then attach dates and notes.</p>
          </div>

          <div className="grid gap-4">
            <Input placeholder="City name" value={formValues.cityName} onChange={(event) => setFormValues({ ...formValues, cityName: event.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="date" value={formValues.arrivalDate} onChange={(event) => setFormValues({ ...formValues, arrivalDate: event.target.value })} />
              <Input type="date" value={formValues.departureDate} onChange={(event) => setFormValues({ ...formValues, departureDate: event.target.value })} />
            </div>
            <textarea rows={4} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="Notes for this stop" value={formValues.notes} onChange={(event) => setFormValues({ ...formValues, notes: event.target.value })} />
            <Button type="button" onClick={addNewStop} className="w-full">Add stop</Button>
          </div>

          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Live stats</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Estimated spend</span><span>${selectedTripSummary.estimatedSpent}</span></div>
              <div className="flex items-center justify-between"><span>Trip budget</span><span>${trip?.budget || 0}</span></div>
              <div className="flex items-center justify-between"><span>Visibility</span><span className="capitalize">{trip?.visibility}</span></div>
            </div>
          </div>

          <Link to="/discover" className="block rounded-3xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-brand-600 transition hover:border-brand-300">
            Discover more cities
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default BuilderPage;