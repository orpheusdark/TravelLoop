import { Link } from 'react-router-dom';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

const ForgotPasswordPage = () => {
  return (
    <div>
      <div className="mb-10 max-w-xl text-center">
        <div className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-600">Reset password</div>
        <h1 className="text-4xl font-semibold text-slate-950">Forgot your password?</h1>
        <p className="mt-4 text-slate-600">Enter your email and we’ll send a reset link to keep your travel planning on track.</p>
      </div>

      <form className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <Input placeholder="hello@traveloop.com" type="email" />
        <Button type="submit" className="w-full">Send reset link</Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Remembered your password?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">Sign in</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
