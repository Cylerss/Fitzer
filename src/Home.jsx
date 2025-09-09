
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, LogIn, Search, Apple, Bot, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Home() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <Hero />
      <BMICalculator />
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
          href="#home" 
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
            href="#home" 
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
            href="#contact" 
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
          {/* Theme Toggle Button */}
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

          {/* Mobile Controls */}
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
      {/* Mobile Menu Panel */}
      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a
              href="#home"
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
              href="#/assistant"
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
              href="#contact"
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

/* ===== Hero ===== */
function Hero() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <section id="home" className="relative min-h-[72vh] grid place-items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571907480495-7d2fccd4f451?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)",
        }}
      />

      <div className="relative z-10 max-w-4xl px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${themeColors.text}`}
        >
          Transform Your Body, <span className={themeColors.accent}>Transform Your Life.</span>
        </motion.h1>

        <p className={`mt-4 ${themeColors.textSecondary} max-w-2xl mx-auto`}>
          Smart exercise plans, personalized diets, and an on-page AI coach. Your fitness journey—gamified and simple.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="#diet"
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 146, 60, 0.3)",
              y: -2,
              boxShadow: `0 0 25px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <Apple className="h-5 w-5" /> Get Your Plan
          </motion.a>

          <motion.a
            href="#/assistant"
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.cardBg} ring-1 ${themeColors.border} ${themeColors.text} hover:${themeColors.cardBgHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
              y: -2,
              boxShadow: `0 0 25px ${themeColors.accentShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            <Bot className="h-5 w-5" /> Start Training Today
          </motion.a>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <StatCard label="Workouts" value="650+" />
          <StatCard label="Diet Plans" value="120+" />
          <StatCard label="Active Users" value="25k" />
          <StatCard label="Avg. Streak" value="18 days" />
        </div>
      </div>
    </section>
  );
}

/* ===== Small helper components used on Home page ===== */
function Badge({ children }) {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full ${themeColors.accentBg} px-3 py-1 text-xs font-medium ${themeColors.accent} ring-1 ${themeColors.accentRing}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value }) {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <motion.div 
      className={`rounded-2xl ${themeColors.cardBg} ring-1 ${themeColors.borderSecondary} p-4`}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        y: -4,
        boxShadow: `0 0 20px ${themeColors.accentShadow}`
      }}
      transition={{ duration: 0.2 }}
    >
      <div className={`text-2xl font-extrabold ${themeColors.text}`}>{value}</div>
      <div className={`text-xs ${themeColors.textMuted}`}>{label}</div>
    </motion.div>
  );
}

/* ===== Quick preview area (wireframe blocks for modules you'll implement later) ===== */
function QuickPreview() {}
function Footer() {}

/* ===== BMI Calculator ===== */
function BMICalculator() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const [age, setAge] = React.useState(25);
  const [heightCm, setHeightCm] = React.useState(170);
  const [weightKg, setWeightKg] = React.useState(70);

  const heightM = heightCm > 0 ? heightCm / 100 : 0;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

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
    <section id="diet" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h2 className={`text-2xl font-semibold ${themeColors.text} mb-4`}>Start your journey</h2>
      <motion.div
        className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border} text-center`}
        whileHover={{
          scale: 1.01,
          backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.03)",
          boxShadow: `0 0 20px ${themeColors.accentShadow}`
        }}
        transition={{ duration: 0.2 }}
      >
        <p className={`${themeColors.textSecondary}`}>Enter a few details to get your personalized score.</p>
        <motion.a
          href="#/exercise"
          className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`}
          whileHover={{ scale: 1.05, y: -2, boxShadow: `0 0 25px ${themeColors.accentShadowStrong}` }}
          transition={{ duration: 0.2 }}
        >
          Get started
        </motion.a>
      </motion.div>
    </section>
  );
}
