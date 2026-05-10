import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import { SortableTripStop } from '../components/SortableTripStop';

const stopSchema = z.object({
  city: z.string().min(2),
  arrivalDate: z.string(),
  departureDate: z.string(),
  notes: z.string().optional()
});

type StopInput = z.infer<typeof stopSchema>;

const BuilderPage = () => {
  const navigate = useNavigate();
  const [stops, setStops] = useState<StopInput[]>([
    { city: 'Lisbon', arrivalDate: '2026-09-01', departureDate: '2026-09-04', notes: 'Start with historic Alfama.' },
    { city: 'Porto', arrivalDate: '2026-09-05', departureDate: '2026-09-08', notes: 'Food tour and Douro river cruise.' }
  ]);

  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<StopInput>({ city: '', arrivalDate: '', departureDate: '', notes: '' });
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      setStops((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const addStop = () => {
    setStops((prev) => [...prev, formValues]);
    setFormValues({ city: '', arrivalDate: '', departureDate: '', notes: '' });
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Itinerary builder</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Organize your trip timeline</h1>
            <p className="mt-3 text-slate-600">Drag stops in the order you want, assign dates, and keep activity notes for each location.</p>
          </div>
          <Button onClick={() => navigate('/discover')}>Add destinations</Button>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Trip timeline</h2>
              <p className="text-sm text-slate-500">Reorder stops and keep your travel flow cohesive.</p>
            </div>
            <span className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{stops.length} locations</span>
          </div>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={stops.map((_, index) => String(index))} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <SortableTripStop key={index} id={String(index)} stop={stop} onSelect={() => setSelectedStop(index)} selected={selectedStop === index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Card>

        <Card className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Add new stop</h2>
            <p className="text-sm text-slate-500">Drop in city details and travel dates to expand your route.</p>
          </div>

          <div className="grid gap-4">
            <Input placeholder="City name" value={formValues.city} onChange={(event) => setFormValues({ ...formValues, city: event.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="date" value={formValues.arrivalDate} onChange={(event) => setFormValues({ ...formValues, arrivalDate: event.target.value })} />
              <Input type="date" value={formValues.departureDate} onChange={(event) => setFormValues({ ...formValues, departureDate: event.target.value })} />
            </div>
            <textarea rows={4} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="Notes for this stop" value={formValues.notes} onChange={(event) => setFormValues({ ...formValues, notes: event.target.value })} />
            <Button type="button" onClick={addStop} className="w-full">Add stop</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BuilderPage;
