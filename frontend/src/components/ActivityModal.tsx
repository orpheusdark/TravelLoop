import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  activity: any | null;
  open: boolean;
  onClose: () => void;
}

const ActivityModal = ({ activity, open, onClose }: Props) => {
  return (
    <AnimatePresence>
      {open && activity && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.18 }} className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-500">✕</button>
            <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">{activity.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{activity.category} • {activity.duration} hr • {activity.estimatedCost} USD</p>
                <p className="mt-4 text-slate-700">{activity.description}</p>
              </div>
              <div className="h-44 w-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={onClose} className="rounded-2xl bg-slate-100 px-4 py-2">Close</button>
              <button className="rounded-2xl bg-brand-600 px-4 py-2 text-white">Add to trip</button>
            </div>
          </motion.div>
          <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityModal;
