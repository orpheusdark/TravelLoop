import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { signup } from '../services/auth';
import { useAuthStore } from '../hooks/useAuthStore';

const schema = z.object({
  name: z.string().min(2, { message: 'Enter your name' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});

type FormValues = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const response = await signup(values);
    setAuth(response.user, response.token);
    navigate('/');
  };

  return (
    <div>
      <div className="mb-10 max-w-xl text-center">
        <div className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-600">Ready to explore</div>
        <h1 className="text-4xl font-semibold text-slate-950">Create your Traveloop account</h1>
        <p className="mt-4 text-slate-600">Start planning premium itineraries, tracking budgets, and sharing your next adventure.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">Full name</label>
        <Input placeholder="Your name" type="text" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <label className="block text-sm font-medium text-slate-700">Email</label>
        <Input placeholder="hello@traveloop.com" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <label className="block text-sm font-medium text-slate-700">Password</label>
        <Input placeholder="Create a strong password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Creating account...' : 'Create account'}</Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">Sign in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
