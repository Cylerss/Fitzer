import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { motion as m } from 'framer-motion';
import { Dumbbell, LogIn, Search, Sun, Moon, Menu, X } from 'lucide-react';

export default function Profile() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const user = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.user') || '{}'); } catch { return {}; }
  }, []);

  const bmi = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.bmi') || '{}'); } catch { return {}; }
  }, []);

  React.useEffect(() => {
    if (!user || !user.name || !user.username) {
      window.location.hash = '#/login';
    }
  }, [user]);

  const name = user.name || '';
  const username = user.username ? `(@${user.username})` : '';

  const heightCm = Number(bmi.heightCm) || 0;
  const weightKg = Number(bmi.weightKg) || 0;

  const modules = React.useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fitzer.modules') || 'null');
      if (Array.isArray(saved) && saved.length) return saved;
    } catch {}
    return [
      { label: 'Workouts', completed: 3, total: 10 },
      { label: 'Diet Plans', completed: 2, total: 8 },
      { label: 'AI Assistant', completed: 4, total: 12 },
      { label: 'Trainers', completed: 1, total: 6 },
    ];
  }, []);

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <m.a 
            href="#/" 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <m.span 
              className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
              whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.2)", ringColor: "rgba(16, 185, 129, 0.5)", boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)" }}
              transition={{ duration: 0.2 }}
            >
              <Dumbbell className="h-5 w-5 text-emerald-300" />
            </m.span>
            <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</span>
          </m.a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <m.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              Home
            </m.a>
            <m.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              Exercises
            </m.a>
            <m.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              AI Assistant
            </m.a>
            <m.a href="#/login" className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05 }}>
              <LogIn className="h-4 w-4" /> Login
            </m.a>
          </nav>

          <div className="flex items-center gap-2">
            <m.button className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }}>
              {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
            </m.button>
            <div className="md:hidden flex items-center gap-2">
              <m.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1 }}>
                <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
              </m.button>
              <m.button className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} aria-label="Open menu">
                <Menu className={`h-5 w-5 ${themeColors.text}`} />
              </m.button>
            </div>
          </div>
        </div>
      </header>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-6`}>Profile</h1>

        <motion.div className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold">👤 {name} <span className="text-sm opacity-70">{username}</span></h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="inline-flex items-center gap-1">📏 <span className="font-semibold">{heightCm ? `${heightCm} cm` : '—'}</span></div>
            <div className="inline-flex items-center gap-1">⚖ <span className="font-semibold">{weightKg ? `${weightKg} kg` : '—'}</span></div>
            <div className="inline-flex items-center gap-1">🕒 <span className="opacity-80">Updated from BMI</span></div>
          </div>
        </motion.div>

        <motion.div className={`mt-6 rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.01 }}>
          <h3 className="font-semibold mb-4">📊 Module Progress</h3>
          <div className="space-y-3">
            {modules.map((mItem, idx) => {
              const pct = mItem.total > 0 ? Math.min(100, Math.round((mItem.completed / mItem.total) * 100)) : 0;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{mItem.label}</span>
                    <span className="opacity-70">{mItem.completed}/{mItem.total} • {pct}%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}


