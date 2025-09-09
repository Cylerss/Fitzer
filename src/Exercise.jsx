import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, LogIn, Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Exercise() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-2`}>Exercises</h1>
        <p className={`${themeColors.textSecondary} mb-6`}>Enter your details to get your personalized score.</p>
        <Calculator />
      </section>
    </div>
  );
}

function NavBar() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <motion.a 
          href="#/" 
          className="flex items-center gap-3"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
            whileHover={{ 
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              ringColor: "rgba(16, 185, 129, 0.5)",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)"
            }}
            transition={{ duration: 0.2 }}
          >
            <Dumbbell className="h-5 w-5 text-emerald-300" />
          </motion.span>
          <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <motion.a 
            href="#/" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#/exercise" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Exercises
          </motion.a>
          <motion.a 
            href="#diet" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Diet Plans
          </motion.a>
          <motion.a 
            href="#/assistant" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            AI Assistant
          </motion.a>
          <motion.a 
            href="#trainers" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Trainers
          </motion.a>
          <motion.a 
            href="#/login" 
            className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 146, 60, 0.3)",
              boxShadow: `0 0 20px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <LogIn className="h-4 w-4" /> Login
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              boxShadow: `0 0 15px ${themeColors.accentShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? (
              <Sun className={`h-5 w-5 ${themeColors.accent}`} />
            ) : (
              <Moon className={`h-5 w-5 ${themeColors.accent}`} />
            )}
          </motion.button>

          <div className="md:hidden flex items-center gap-2">
            <motion.button 
              className={`p-2 rounded-lg ${themeColors.cardBg}`}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                boxShadow: `0 0 15px ${themeColors.accentShadow}`
              }}
              transition={{ duration: 0.2 }}
            >
              <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
            </motion.button>
            <motion.button
              onClick={() => setIsMobileOpen(v => !v)}
              className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              aria-label="Open menu"
            >
              {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
            </motion.button>
          </div>
        </div>
      </div>
      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a
              href="#/"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#/exercise"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Exercises
            </motion.a>
            <motion.a
              href="#diet"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Diet Plans
            </motion.a>
            <motion.a
              href="#assistant"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              AI Assistant
            </motion.a>
            <motion.a
              href="#trainers"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Trainers
            </motion.a>
            <motion.a
              href="#/login"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Login
            </motion.a>
          </div>
        </div>
      )}
    </header>
  );
}

function Calculator() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const [age, setAge] = React.useState(25);
  const [heightCm, setHeightCm] = React.useState(() => {
    try { return Number(JSON.parse(localStorage.getItem('fitzer.bmi') || '{}').heightCm) || 170; } catch { return 170; }
  });
  const [weightKg, setWeightKg] = React.useState(() => {
    try { return Number(JSON.parse(localStorage.getItem('fitzer.bmi') || '{}').weightKg) || 70; } catch { return 70; }
  });

  const heightM = heightCm > 0 ? heightCm / 100 : 0;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  React.useEffect(() => {
    const payload = { heightCm, weightKg, updatedAt: Date.now() };
    localStorage.setItem('fitzer.bmi', JSON.stringify(payload));
  }, [heightCm, weightKg]);

  const bmiCategory = (() => {
    if (!isFinite(bmi) || bmi === 0) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  })();

  const chart = React.useMemo(() => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const maxBmi = 40;
    const pct = Math.max(0, Math.min(1, bmi / maxBmi));
    const dashOffset = circumference * (1 - pct);

    let color = '#10b981';
    if (bmiCategory === 'Underweight') color = '#9ca3af';
    if (bmiCategory === 'Overweight' || bmiCategory === 'Obese') color = '#ef4444';

    const trackColor = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
    const labelColor = isDarkMode ? '#e5e7eb' : '#111827';
    const subLabelColor = isDarkMode ? '#9ca3af' : '#6b7280';

    return { radius, circumference, dashOffset, color, trackColor, labelColor, subLabelColor };
  }, [bmi, bmiCategory, isDarkMode]);

  return (
    <motion.div
      className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`}
      whileHover={{
        scale: 1.01,
        backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.03)",
        boxShadow: `0 0 20px ${themeColors.accentShadow}`
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Age</label>
            <input
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Height (cm)</label>
            <input
              type="number"
              min={50}
              max={260}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Weight (kg)</label>
            <input
              type="number"
              min={10}
              max={400}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg width={160} height={160} viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={chart.radius} stroke={chart.trackColor} strokeWidth="14" fill="none" />
              <motion.circle
                cx="80"
                cy="80"
                r={chart.radius}
                stroke={chart.color}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={chart.circumference}
                animate={{ strokeDashoffset: chart.dashOffset }}
                initial={{ strokeDashoffset: chart.circumference }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div style={{ color: chart.labelColor }} className="text-3xl font-extrabold">{bmi || '—'}</div>
                <div style={{ color: chart.subLabelColor }} className="text-xs mt-1">{bmi ? bmiCategory : 'Enter details'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-4 text-xs ${themeColors.textMuted}`}>
        BMI is calculated as weight / (height²). Age is collected for context only.
      </div>
      {React.useEffect(() => {
        const payload = { heightCm, weightKg, updatedAt: Date.now() };
        localStorage.setItem('fitzer.bmi', JSON.stringify(payload));
      }, [heightCm, weightKg])}
    </motion.div>
  );
}


