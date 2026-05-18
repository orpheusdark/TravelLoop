import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrips, addActivityToStop, addActivityToTrip } from '../services/trips';

interface Props {
  activity: any | null;
  open: boolean;
  onClose: () => void;
}

const ActivityModal = ({ activity, open, onClose }: Props) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getTrips().then((res) => {
        setTrips(res.trips || []);
        if (res.trips && res.trips.length > 0) {
          setSelectedTripId(res.trips[0].id);
          if (res.trips[0].tripStops && res.trips[0].tripStops.length > 0) {
            setSelectedStopId(res.trips[0].tripStops[0].id);
          }
        }
      }).catch(() => {});
    }
  }, [open]);

  const handleAdd = async () => {
    if (!activity || !selectedStopId) return;
    setLoading(true);
    try {
      await addActivityToStop({ stopId: selectedStopId, activity });
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddToTrip = async () => {
    if (!activity || !selectedTripId) return;
    setLoading(true);

    // optimistic update: add to local trips state immediately
    const tripIndex = trips.findIndex(t => t.id === selectedTripId);
    if (tripIndex !== -1) {
      const tripsCopy = JSON.parse(JSON.stringify(trips));
      const trip = tripsCopy[tripIndex];
      if (!trip.tripStops || trip.tripStops.length === 0) {
        trip.tripStops = [{ id: -(Date.now()), cityName: activity.cityName || 'Unknown', activities: [{ id: -(Date.now()) - 1, activity }], arrivalDate: trip.startDate }];
      } else {
        const stop = trip.tripStops[0];
        stop.activities = stop.activities || [];
        stop.activities.push({ id: -(Date.now()) - 1, activity });
      }
      setTrips(tripsCopy);
    }

    try {
      await addActivityToTrip(selectedTripId, { activity });
      setSuccessMsg('Added to trip');
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 900);
    } catch (e) {
      console.error(e);
      setSuccessMsg('Failed to add');
      setTimeout(() => setSuccessMsg(null), 1600);
    } finally {
      setLoading(false);
    }
  };

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && activity && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center" role="presentation">
          <motion.div role="dialog" aria-modal="true" aria-labelledby="activity-modal-title" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.18 }} className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <button ref={closeBtnRef} onClick={onClose} className="absolute right-4 top-4 text-slate-500" aria-label="Close activity dialog">✕</button>
            <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
              <div>
                <h3 id="activity-modal-title" className="text-2xl font-semibold text-slate-950">{activity.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{activity.category} • {activity.duration} hr • {activity.estimatedCost} USD</p>
                <p className="mt-4 text-slate-700">{activity.description}</p>
              </div>
              <div className="h-44 w-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-slate-600">Select trip</label>
                <select value={selectedTripId ?? ''} onChange={(e) => { const id = Number(e.target.value); setSelectedTripId(id); const trip = trips.find(t => t.id === id); setSelectedStopId(trip?.tripStops?.[0]?.id ?? null); }} className="mt-1 w-full rounded-md border px-3 py-2">
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Select stop</label>
                <select value={selectedStopId ?? ''} onChange={(e) => setSelectedStopId(Number(e.target.value))} className="mt-1 w-full rounded-md border px-3 py-2">
                  {trips.find(t => t.id === selectedTripId)?.tripStops?.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.cityName || 'Unnamed stop'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={onClose} className="rounded-2xl bg-slate-100 px-4 py-2">Close</button>
              <button onClick={handleAdd} disabled={loading || !selectedStopId} className="rounded-2xl bg-slate-500 px-4 py-2 text-white">{loading ? 'Adding...' : 'Add to stop'}</button>
              <button onClick={handleAddToTrip} disabled={loading || !selectedTripId} className="rounded-2xl bg-brand-600 px-4 py-2 text-white">{loading ? 'Adding...' : 'Add to trip'}</button>
            </div>
            {successMsg && (
              <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-green-600 px-3 py-1 text-white">{successMsg}</div>
            )}
          </motion.div>
          <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityModal;
