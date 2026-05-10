import { Link, NavLink } from 'react-router-dom';
import { FiCompass, FiDollarSign, FiHome, FiList, FiMap, FiUser, FiBookOpen } from 'react-icons/fi';
import clsx from 'clsx';

const links = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/trips', label: 'Trips', icon: FiMap },
  { to: '/builder', label: 'Itinerary', icon: FiList },
  { to: '/discover', label: 'Discover', icon: FiCompass },
  { to: '/analytics', label: 'Budget', icon: FiDollarSign },
  { to: '/packing', label: 'Packing', icon: FiBookOpen },
  { to: '/notes', label: 'Journal', icon: FiUser }
];

const Navigation = () => {
  return (
    <aside className="hidden w-72 flex-col gap-6 rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-soft lg:flex">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-3 text-xl font-semibold text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-lg">T</span>
          Traveloop
        </Link>
      </div>
      <nav className="space-y-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition',
                  isActive ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navigation;
