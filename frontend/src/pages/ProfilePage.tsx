import { useState, useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';
import { FiCamera, FiGlobe, FiMoon, FiShield, FiTrash2 } from 'react-icons/fi';

const backgrounds = [
  { id: 'ocean', url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=0c2ac5a4d1e2f8f8c12e8d6f3a3f7d8a" },
  { id: 'mountain', url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b5f1d3f2ca6d2c6b5d9f4e1f1c7a5b2" },
  { id: 'city', url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=c3f4b5a6d7e8f9a0b1c2d3e4f5a6b7c8" }
];

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [bg, setBg] = useState<string>(() => localStorage.getItem('traveloop:bg') || backgrounds[0].url);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-url', `url('${bg}')`);
    localStorage.setItem('traveloop:bg', bg);
  }, [bg]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-brand-700 text-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_240px] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Account</p>
            <h1 className="mt-2 text-3xl font-semibold">Profile settings</h1>
            <p className="mt-3 max-w-2xl text-slate-200">Update traveler details, preferences, and security in a polished control center.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-950 shadow-lg">
                <FiCamera className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Avatar</p>
                <p className="text-lg font-semibold">Traveler profile</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
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
          <div className="grid gap-4 md:grid-cols-2">
            <button type="button" className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-700 transition hover:border-brand-300">
              <span className="flex items-center gap-3"><FiMoon className="h-5 w-5 text-brand-600" /> Theme</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">Light</span>
            </button>
            <button type="button" className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-700 transition hover:border-brand-300">
              <span className="flex items-center gap-3"><FiGlobe className="h-5 w-5 text-brand-600" /> Language</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">EN</span>
            </button>
            <button type="button" className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-700 transition hover:border-brand-300">
              <span className="flex items-center gap-3"><FiShield className="h-5 w-5 text-brand-600" /> Security</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">JWT</span>
            </button>
            <button type="button" className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-700 transition hover:border-red-300">
              <span className="flex items-center gap-3"><FiTrash2 className="h-5 w-5 text-red-500" /> Delete account</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-500">Danger</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button>Save changes</Button>
            <Button onClick={logout} className="bg-slate-900 text-white hover:bg-slate-800">Sign out</Button>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Saved preferences</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <label className="block mb-2 text-sm font-medium text-slate-700">Background</label>
            <div className="flex items-center gap-3">
              {backgrounds.map((b) => (
                <button key={b.id} type="button" onClick={() => setBg(b.url)} className="relative rounded-xl overflow-hidden border-2 transition" style={{ borderColor: bg === b.url ? 'rgba(99,102,241,1)' : 'transparent' }}>
                  <img src={b.url} alt={b.id} className="h-16 w-28 object-cover" />
                  {bg === b.url ? <span className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white text-xs">✓</span> : null}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-3xl bg-slate-50 px-4 py-4">Theme: light glass</div>
            <div className="rounded-3xl bg-slate-50 px-4 py-4">Language: English</div>
            <div className="rounded-3xl bg-slate-50 px-4 py-4">Privacy: private trips by default</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
