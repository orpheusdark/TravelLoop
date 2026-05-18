import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGlobe, FiLayers, FiShield, FiZap } from 'react-icons/fi';

const features = [
  {
    title: 'Neural Itinerary Engine',
    text: 'Build route-aware plans with smart sequencing, budget estimates, and dynamic duration tuning.',
    icon: FiZap
  },
  {
    title: 'Live Discovery Grid',
    text: 'Surface activities, hidden gems, and practical travel context in one interactive mission dashboard.',
    icon: FiGlobe
  },
  {
    title: 'Multi-Layer Trip Control',
    text: 'Switch between timeline, city blocks, and budget layers with smooth transitions and zero reloads.',
    icon: FiLayers
  },
  {
    title: 'Secure Sharing Core',
    text: 'Collaborate privately, publish selected trip moments, and keep account access protected.',
    icon: FiShield
  }
];

const LandingPage = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(125deg, rgba(7,16,26,0.9), rgba(13,34,54,0.72)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], x: [0, 24, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-80px] top-[-50px] h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
        animate={{ scale: [1, 1.08, 1], x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/30">T</div>
            <span className="text-xl font-semibold tracking-wide">Traveloop</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <Link to="/login" className="rounded-2xl border border-white/35 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20">Log in</Link>
            <Link to="/signup" className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-200">Get started</Link>
          </motion.div>
        </header>

        <section className="grid items-center gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="inline-flex items-center rounded-full border border-cyan-200/40 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
              Futuristic Travel OS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl"
            >
              Plan smarter journeys with cinematic interactions.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 max-w-xl text-base text-slate-100/90 sm:text-lg">
              From discovery to itinerary to shared memories, Traveloop combines AI planning, interactive motion, and powerful collaboration in one modern platform.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-200">
                Create free account <FiArrowRight />
              </Link>
              <Link to="/login" className="inline-flex items-center rounded-2xl border border-white/35 bg-white/10 px-5 py-3 text-sm backdrop-blur hover:bg-white/20">
                I already have an account
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur"
          >
            <div className="rounded-2xl border border-white/20 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Mission Control</p>
              <p className="mt-2 text-xl font-semibold">Tokyo → Kyoto Loop</p>
              <div className="mt-5 space-y-3">
                {[72, 55, 88].map((width, idx) => (
                  <motion.div key={idx} className="h-2 rounded-full bg-white/20" initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ delay: 0.5 + idx * 0.15 }} />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-cyan-300/20 p-3">
                  <p className="text-lg font-semibold">9</p>
                  <p className="text-xs text-slate-100/80">Stops</p>
                </div>
                <div className="rounded-xl bg-amber-300/20 p-3">
                  <p className="text-lg font-semibold">$2.4k</p>
                  <p className="text-xs text-slate-100/80">Budget</p>
                </div>
                <div className="rounded-xl bg-emerald-300/20 p-3">
                  <p className="text-lg font-semibold">18</p>
                  <p className="text-xs text-slate-100/80">Activities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 + idx * 0.07 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"
              >
                <div className="mb-3 inline-flex rounded-xl bg-cyan-300/20 p-2 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-100/85">{item.text}</p>
              </motion.article>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
