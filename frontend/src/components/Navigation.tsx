import { Link, NavLink } from 'react-router-dom';
import { FiCompass, FiDollarSign, FiHome, FiList, FiMap, FiUser, FiBookOpen } from 'react-icons/fi';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
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
        <Link to="/dashboard" className="inline-flex items-center gap-3 text-xl font-semibold text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-lg">T</span>
          Traveloop
        </Link>
      </div>
      <nav className="space-y-3">
        {links.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}>
              <NavLink
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
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navigation;
