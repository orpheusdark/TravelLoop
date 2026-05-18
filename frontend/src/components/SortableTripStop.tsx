import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableTripStop = ({ id, stop, selected, onSelect, onDelete }: { id: string; stop: any; selected: boolean; onSelect: () => void; onDelete?: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const cityLabel = stop.cityName || stop.city?.name || stop.city || 'Unknown city';
  const arrival = stop.arrivalDate ? new Date(stop.arrivalDate).toLocaleDateString() : 'TBD';
  const departure = stop.departureDate ? new Date(stop.departureDate).toLocaleDateString() : 'TBD';

  return (
    <div ref={setNodeRef} style={style} className={`rounded-3xl border ${selected ? 'border-brand-400 bg-brand-50/70' : 'border-slate-200 bg-white'} p-5 shadow-sm backdrop-blur-xl`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-slate-500">{cityLabel}</div>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{arrival} – {departure}</h3>
        </div>
        <button className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200" type="button" {...attributes} {...listeners}>Drag</button>
      </div>
      <p className="mt-4 text-slate-600">{stop.notes || 'Add notes to enrich this stop.'}</p>
      <div className="mt-4 flex items-center gap-3">
        <button className="text-sm font-semibold text-brand-600" type="button" onClick={onSelect}>Edit stop</button>
        {onDelete ? <button className="text-sm font-semibold text-slate-500 hover:text-red-600" type="button" onClick={onDelete}>Remove</button> : null}
      </div>
      {Array.isArray(stop.activities) && stop.activities.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {stop.activities.map((item: any) => (
            <span key={item.id} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              {item.activity?.title || item.title || 'Activity'}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};
