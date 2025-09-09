
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, LogIn, Search, Apple, Bot, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Home() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <Hero />
      <QuickPreview />
      <Footer />
    </div>
  );
}


function NavBar() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

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
          <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>FITFORGE</span>
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
            href="#exercises" 
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
            href="#assistant" 
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

          {/* Mobile Search Button */}
        <div className="md:hidden">
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
          </div>
        </div>
      </div>
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
            href="#assistant"
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
function QuickPreview() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const previewBlocks = [
    { id: "exercises", title: "Exercises Module", bullets: ["Search & filter", "Animated cards", "Details modal"] },
    { id: "diet", title: "Diet Plans", bullets: ["BMI calculator", "Personalized cards", "Cal/day estimates"] },
    { id: "assistant", title: "AI Assistant", bullets: ["Chat UI", "Quick prompts", "Instant suggestions"] },
    { id: "trainers", title: "Trainers", bullets: ["Profile cards", "Book a session"] },
    { id: "dashboard", title: "Sync Dashboard", bullets: ["Daily logs", "Progress bars", "Badges"] },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <h2 className={`text-2xl font-semibold ${themeColors.text} mb-6`}>Home — Module Preview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewBlocks.map((b) => (
          <motion.div 
            key={b.id} 
            className={`rounded-2xl p-5 ${themeColors.cardBgSecondary} ring-1 ${themeColors.borderSecondary}`}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              y: -4,
              boxShadow: `0 0 20px ${themeColors.accentShadowLight}`
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`${themeColors.text} font-medium`}>{b.title}</h3>
              <span className={`text-xs ${themeColors.textSecondary}`}>{b.bullets.length} items</span>
            </div>
            <ul className={`text-sm ${themeColors.textSecondary} list-disc pl-5 space-y-2`}>
              {b.bullets.map((pt) => (
                <li key={pt} className={themeColors.textSecondary}>{pt}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <motion.button 
                className={`text-xs px-3 py-2 rounded-lg ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent}`}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 146, 60, 0.3)",
                  boxShadow: `0 0 15px ${themeColors.accentShadowStrong}`
                }}
                transition={{ duration: 0.2 }}
              >
                View
              </motion.button>
              <motion.button 
                className={`text-xs px-3 py-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border} ${themeColors.text}`}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  boxShadow: `0 0 15px ${themeColors.accentShadow}`
                }}
                transition={{ duration: 0.2 }}
              >
                Edit
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <footer className={`mt-12 border-t ${themeColors.borderSecondary} ${themeColors.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ 
            scale: 1.02,
            boxShadow: `0 0 20px ${themeColors.accentShadowLight}`
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className={`h-9 w-9 grid place-items-center rounded-2xl ${themeColors.accentBg} ring-1 ${themeColors.accentRing}`}
            whileHover={{ 
              backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.2)" : "rgba(251, 146, 60, 0.2)",
              ringColor: isDarkMode ? "rgba(16, 185, 129, 0.5)" : "rgba(251, 146, 60, 0.5)",
              boxShadow: `0 0 15px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <Dumbbell className={`h-5 w-5 ${themeColors.accent}`} />
          </motion.span>
          <div>
            <div className={`${themeColors.text} font-semibold`}>FITFORGE</div>
            <div className={`text-xs ${themeColors.textMuted}`}>Personalized training & nutrition</div>
          </div>
        </motion.div>

        <div className={`text-xs ${themeColors.textMuted}`}>&copy; {new Date().getFullYear()} FitForge. All rights reserved.</div>
      </div>
    </footer>
  );
}
