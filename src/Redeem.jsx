import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Dumbbell, LogIn, Search, Apple, Bot, Sun, Moon, Menu, X, Gift, User } from 'lucide-react';

export default function Redeem() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const [points, setPoints] = React.useState(() => {
    try { return Number(localStorage.getItem('fitzer.points') || '0'); } catch { return 0; }
  });

  const coupons = React.useMemo(() => ([
    { id: 'coupon-5', title: '5% Off Protein', cost: 60, desc: 'Save on selected protein powders.' },
    { id: 'coupon-10', title: '10% Off Workout Gear', cost: 100, desc: 'Discount on tees, shorts, and more.' },
    { id: 'coupon-pt', title: 'Free PT Session (30m)', cost: 180, desc: 'One virtual coaching session.' },
    { id: 'coupon-meal', title: 'Free Healthy Meal', cost: 140, desc: 'Redeem at partner stores.' },
  ]), []);

  const handleRedeem = (coupon) => {
    if (points < coupon.cost) {
      alert('Not enough points to redeem this coupon.');
      return;
    }
    const next = points - coupon.cost;
    setPoints(next);
    try { localStorage.setItem('fitzer.points', String(next)); } catch {}
    alert(`Redeemed: ${coupon.title}`);
  };

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-3xl font-bold ${themeColors.text}`}>Redeem</h1>
          <div className="flex items-center gap-2 text-sm">
            <Gift className="w-5 h-5 text-yellow-600" />
            <span>Your points:</span>
            <span className="font-semibold">{points}</span>
          </div>
        </div>

        <motion.div className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.01 }}>
          <div className={`${themeColors.textSecondary} text-sm mb-4`}>Choose a reward and redeem with your points.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map(c => (
              <motion.div key={c.id} className={`rounded-2xl p-4 ${themeColors.cardBg} ring-1 ${themeColors.border} hover:${themeColors.cardBgHover}`} whileHover={{ y: -3, scale: 1.01 }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{c.title}</div>
                    <div className={`text-xs mt-1 ${themeColors.textSecondary}`}>{c.desc}</div>
                  </div>
                  <div className="h-10 w-10 grid place-items-center rounded-xl bg-yellow-400/20 ring-1 ring-yellow-400/40">🎟️</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm"><span className="font-semibold">{c.cost}</span> pts</div>
                  <button onClick={() => handleRedeem(c)} className="rounded-xl px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white">Redeem</button>
                </div>
              </motion.div>
            ))}
          </div>

          <a href="#/profile" className={`inline-flex mt-6 rounded-2xl px-4 py-2 ${themeColors.accentBg} ${themeColors.accent} ring-1 ${themeColors.accentRing}`}>Back to Profile</a>
        </motion.div>
      </section>

      {/* Floating AI button (same as Home) */}
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <motion.button
          className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          <Bot className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
        </motion.button>
      </a>
    </div>
  );
}

function NavBar() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isShrunk, setIsShrunk] = React.useState(false);
  const lastYRef = React.useRef(0);
  const isLoggedIn = React.useMemo(() => {
    try { const u = JSON.parse(localStorage.getItem('fitzer.user') || '{}'); return Boolean(u && u.username); } catch { return false; }
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastYRef.current;
      setIsShrunk(goingDown && y > 10);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <motion.a 
          href="#/" 
          className="flex items-center gap-3"
          animate={{ scale: isShrunk ? 0.9 : 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
            animate={{ scale: isShrunk ? 0.95 : 1 }}
            whileHover={{ 
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              ringColor: "rgba(16, 185, 129, 0.5)",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)"
            }}
            transition={{ duration: 0.2 }}
          >
            <Dumbbell className="h-5 w-5 text-emerald-300" />
          </motion.span>
          <motion.span animate={{ scale: isShrunk ? 0.95 : 1 }} className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</motion.span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <motion.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>Home</motion.a>
          <motion.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>Exercises</motion.a>
          <motion.a href="#/diet" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>Diet Plans</motion.a>
          <motion.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>AI Assistant</motion.a>
          <motion.a href="#/profile" className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05 }}>
            <LogIn className="h-4 w-4" /> Profile
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button onClick={toggleTheme} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }}>
            {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
          </motion.button>
          <div className="md:hidden flex items-center gap-2">
            <motion.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1 }}>
              <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
            </motion.button>
            <motion.button onClick={() => setIsMobileOpen(v => !v)} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} aria-label="Open menu">
              {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
            </motion.button>
          </div>
          <motion.a href={isLoggedIn ? "#/profile" : "#/login"} className={`hidden md:inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05 }}>
            {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />} {isLoggedIn ? 'Profile' : 'Login'}
          </motion.a>
        </div>
      </div>

      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Home</motion.a>
            <motion.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Exercises</motion.a>
            <motion.a href="#/diet" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Diet Plans</motion.a>
            <motion.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>AI Assistant</motion.a>
            <motion.a href="#/profile" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Profile</motion.a>
          </div>
        </div>
      )}
    </header>
  );
}



