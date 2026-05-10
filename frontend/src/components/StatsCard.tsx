import { ReactNode } from 'react';
import clsx from 'clsx';

const StatsCard = ({ title, value, accent, children }: { title: string; value: string; accent?: string; children?: ReactNode }) => {
  return (
    <div className={clsx('rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-soft', accent)}>
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="text-3xl font-bold text-slate-950">{value}</div>
      {children}
    </div>
  );
};

export default StatsCard;
