import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { login } from '../services/auth';
import { useAuthStore } from '../hooks/useAuthStore';

const schema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const response = await login(values);
    setAuth(response.user, response.token);
    navigate('/');
  };

  return (
    <div>
      <div className="mb-10 max-w-xl text-center">
        <div className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-600">Welcome back</div>
        <h1 className="text-4xl font-semibold text-slate-950">Sign in to Traveloop</h1>
        <p className="mt-4 text-slate-600">Manage your trips, build itineraries, and share travel stories with a polished planner experience.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <Input placeholder="hello@traveloop.com" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <label className="block text-sm font-medium text-slate-700">Password</label>
        <Input placeholder="Enter password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <div className="flex items-center justify-between text-sm text-slate-600">
          <Link to="/forgot-password" className="font-medium text-brand-600 hover:text-brand-500">Forgot password?</Link>
          <span className="rounded-full bg-slate-100 px-3 py-1">Secure login</span>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Signing in...' : 'Sign in'}</Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        New around Traveloop?{' '}
        <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-500">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
