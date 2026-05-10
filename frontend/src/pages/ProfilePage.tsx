import { useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');

  return (
    <div className="space-y-8">
      <Card>
        <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Account</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Profile settings</h1>
            <p className="mt-3 text-slate-600">Update your traveler profile, preferences and account details in one polished dashboard.</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-semibold">Premium startup UI</p>
            <p className="mt-2">Dark mode coming soon. Keep your profile updated and stay organized.</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Name</label>
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <Input value={email} disabled />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Save changes</Button>
          <Button onClick={logout} className="bg-slate-900 text-white hover:bg-slate-800">Sign out</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
