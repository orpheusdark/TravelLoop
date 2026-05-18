import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OnboardingPulse = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('traveloop:onboardShown');
    if (!seen) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed left-10 top-24 z-40">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: [0.9, 1.05, 0.95], opacity: 1 }} transition={{ repeat: Infinity, duration: 2 }} className="flex items-center gap-3">
        <div className="rounded-full bg-brand-600 p-3 text-white shadow-lg">✨</div>
        <div className="rounded-2xl bg-white/95 p-3 shadow-md text-sm">
          <div className="font-semibold">Create your first trip</div>
          <div className="mt-1 text-xs text-slate-600">Click the big button to add a trip — you can always edit it later.</div>
          <div className="mt-2 flex justify-end">
            <button onClick={() => { localStorage.setItem('traveloop:onboardShown', '1'); setShow(false); }} className="text-xs text-brand-600">Got it</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPulse;
