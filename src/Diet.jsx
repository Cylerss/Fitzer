import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Dumbbell, Bot, Sun, Moon, Menu, X, Search } from 'lucide-react';

export default function Diet() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-6`}>Diet Plan</h1>
        <DietPlanModule />
      </section>
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <motion.button className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} aria-label="Open AI Assistant">
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

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <motion.a href="#/" className="flex items-center gap-3" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }} transition={{ duration: 0.2 }}>
          <motion.span className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30" whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.2)", ringColor: "rgba(16, 185, 129, 0.5)", boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)" }} transition={{ duration: 0.2 }}>
            <Dumbbell className="h-5 w-5 text-emerald-300" />
          </motion.span>
          <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <motion.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Home
          </motion.a>
          <motion.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Exercises
          </motion.a>
          <motion.a href="#/diet" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Diet Plans
          </motion.a>
          <motion.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            AI Assistant
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
        </div>
      </div>
      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Home
            </motion.a>
            <motion.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Exercises
            </motion.a>
            <motion.a href="#/diet" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Diet Plans
            </motion.a>
            <motion.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              AI Assistant
            </motion.a>
          </div>
        </div>
      )}
    </header>
  );
}

function DietPlanModule() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [dietType, setDietType] = React.useState('vegan');
  const [plan, setPlan] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const bmiData = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.bmi') || '{}'); } catch { return {}; }
  }, []);
  const bmi = Number(bmiData.bmi) || 0;
  const heightCm = Number(bmiData.heightCm) || 0;
  const weightKg = Number(bmiData.weightKg) || 0;
  const age = Number(bmiData.age) || 0;
  const category = bmi === 0 ? '' : bmi < 18.5 ? 'Underweight' : bmi <= 24.9 ? 'Normal' : 'Overweight';

  React.useEffect(() => {
    // Load saved plan if exists
    try {
      const saved = JSON.parse(localStorage.getItem('fitzer.dietPlan') || 'null');
      if (saved && saved.dietType && saved.items && Array.isArray(saved.items)) {
        setDietType(saved.dietType);
        setPlan(saved.items);
      }
    } catch {}
  }, []);

  const generateWithAI = async () => {
    if (!bmi || !heightCm || !weightKg) {
      setPlan(["Please calculate BMI on the Exercises page first. Then return and generate your diet plan."]); 
      return;
    }
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setPlan(["Add VITE_OPENAI_API_KEY in .env to enable AI diet generation."]); 
      return;
    }
    setIsLoading(true);
    try {
      const prompt = `You are a concise nutrition coach. Create a ${dietType} diet plan for a person with these details: BMI=${bmi} (Category=${category}), Height=${heightCm} cm, Weight=${weightKg} kg, Age=${age || 'N/A'}. Provide exactly 6 short bullet items covering breakfast, snack, lunch, pre/post-workout, and dinner. Tailor portions to the category. Avoid medical claims.`;
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 300 } })
      });
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const items = text.split(/\n|\r/).map(s => s.replace(/^[-•\d\.\)\s]+/, '').trim()).filter(Boolean).slice(0, 6);
      setPlan(items);
      localStorage.setItem('fitzer.dietPlan', JSON.stringify({ category, dietType, items }));
    } catch (e) {
      setPlan(["Couldn't fetch AI plan. Please try again later."]); 
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // Persist selection changes
    if (plan && plan.length) {
      try { localStorage.setItem('fitzer.dietPlan', JSON.stringify({ category, dietType, items: plan })); } catch {}
    }
  }, [dietType, plan, category]);

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-lg font-semibold">Category: <span className={themeColors.accent.replace('text-', '') + ' ' + themeColors.accent}> {category || '—'} </span></div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDietType('vegan')} className={`px-4 py-2 rounded-xl ring-1 ${themeColors.border} ${dietType === 'vegan' ? themeColors.accentBg + ' ' + themeColors.accent : themeColors.cardBgSecondary} `}>🥗 Vegan</button>
            <button onClick={() => setDietType('nonVegan')} className={`px-4 py-2 rounded-xl ring-1 ${themeColors.border} ${dietType === 'nonVegan' ? themeColors.accentBg + ' ' + themeColors.accent : themeColors.cardBgSecondary} `}>🍗 Non-Vegan</button>
            <motion.button onClick={generateWithAI} whileHover={{ scale: 1.03 }} className={`px-4 py-2 rounded-xl ${themeColors.accentBg} ${themeColors.accent} ring-1 ${themeColors.accentRing}`} disabled={isLoading}>
              {isLoading ? 'Generating…' : 'Generate with AI'}
            </motion.button>
          </div>
        </div>
      </div>
      <div className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`}>
        <h2 className="text-xl font-semibold mb-3">🍎 Diet Plan</h2>
        {plan && plan.length ? (
          <ul className={`list-disc pl-5 space-y-2 ${themeColors.text}`}>
            {plan.map((item, idx) => (
              <li key={idx} className={`${themeColors.textSecondary}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className={`${themeColors.textSecondary}`}>No plan yet. Choose type and click Generate with AI.</div>
        )}
      </div>
    </div>
  );
}


