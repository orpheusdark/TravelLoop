import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { createTrip } from '../services/trips';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  title: z.string().min(5, 'Trip title is required'),
  description: z.string().min(15, 'Add a brief trip description'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid start date'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid end date'),
  travelerCount: z.number().min(1, 'At least one traveller'),
  budget: z.number().min(0, 'Budget must be positive'),
  coverImage: z.string().url('Enter a valid URL').optional()
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate']
});

type FormValues = z.infer<typeof schema>;

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { travelerCount: 2, budget: 1500 } });

  const onSubmit = async (values: FormValues) => {
    await createTrip({ ...values, travelerCount: Number(values.travelerCount), budget: Number(values.budget), visibility: 'private' });
    navigate('/trips');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Start a new plan</p>
          <h1 className="text-3xl font-semibold text-slate-950">Create your next trip</h1>
          <p className="text-slate-600">Build a premium trip profile with dates, budgets and beautiful cover imagery.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">Trip title</label>
            <Input placeholder="7-day Portugal escape" {...register('title')} />
            {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">Description</label>
            <textarea rows={5} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" placeholder="Describe your adventure" {...register('description')} />
            {errors.description && <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">Start date</label>
              <Input type="date" {...register('startDate')} />
              {errors.startDate && <p className="mt-2 text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">End date</label>
              <Input type="date" {...register('endDate')} />
              {errors.endDate && <p className="mt-2 text-sm text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">Travellers</label>
              <Input type="number" min="1" {...register('travelerCount', { valueAsNumber: true })} />
              {errors.travelerCount && <p className="mt-2 text-sm text-red-500">{errors.travelerCount.message}</p>}
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">Budget</label>
              <Input type="number" min="0" step="50" {...register('budget', { valueAsNumber: true })} />
              {errors.budget && <p className="mt-2 text-sm text-red-500">{errors.budget.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">Cover image URL</label>
            <Input placeholder="https://images.unsplash.com/..." {...register('coverImage')} />
            {errors.coverImage && <p className="mt-2 text-sm text-red-500">{errors.coverImage.message}</p>}
          </div>
        </div>

        <div className="space-y-6 rounded-[28px] border border-slate-200/80 bg-slate-50 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Budget preview</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">${Number(getValues('budget') || 0).toLocaleString()}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-700">Travel score</p>
            <p className="mt-3 text-slate-600">Your estimated trip has premium planning potential. Add activities and add-ons to refine daily spend.</p>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Saving trip...' : 'Save trip'}</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTripPage;
