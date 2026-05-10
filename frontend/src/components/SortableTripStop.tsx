import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableTripStop = ({ id, stop, selected, onSelect }: { id: string; stop: any; selected: boolean; onSelect: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className={`rounded-3xl border ${selected ? 'border-brand-400 bg-brand-50' : 'border-slate-200 bg-white'} p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">{stop.city}</div>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{stop.arrivalDate} – {stop.departureDate}</h3>
        </div>
        <button className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700" type="button" {...attributes} {...listeners}>Drag</button>
      </div>
      <p className="mt-4 text-slate-600">{stop.notes}</p>
      <button className="mt-4 text-sm font-semibold text-brand-600" onClick={onSelect}>Edit stop</button>
    </div>
  );
};
