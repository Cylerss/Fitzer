import React from "react";
import { motion } from "framer-motion";
import { Send, Dumbbell, LogIn, Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function AIAssistantPage() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const [messages, setMessages] = React.useState([
    {
      sender: "bot",
      text: "Hi, I’m GigaChat, your personal AI trainer. Ask me about workouts, diet, or BMI advice.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const chatEndRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const scrollToBottom = React.useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage({ sender: 'user', text: trimmed });
    setInput("");

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      addMessage({ sender: 'bot', text: 'Missing API key. Add VITE_OPENAI_API_KEY to .env and restart the dev server.' });
      return;
    }

    try {
      setIsLoading(true);
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are GigaChat, a helpful fitness assistant. Give concise, practical advice about workouts, diets, and BMI. If asked for medical advice, recommend consulting a professional.' },
            ...messages.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: trimmed },
          ],
          temperature: 0.7,
          max_tokens: 250,
        })
      });

      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(err || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      const botText = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't process your request.";
      addMessage({ sender: 'bot', text: botText });
    } catch (e) {
      console.error(e);
      addMessage({ sender: 'bot', text: 'There was an error contacting the AI. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <motion.a 
            href="#/" 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
              whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.2)", ringColor: "rgba(16, 185, 129, 0.5)", boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)" }}
              transition={{ duration: 0.2 }}
            >
              <Dumbbell className="h-5 w-5 text-emerald-300" />
            </motion.span>
            <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <motion.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2, textShadow: `0 0 10px ${themeColors.accentTextShadow}` }} transition={{ duration: 0.2 }}>Home</motion.a>
            <motion.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2, textShadow: `0 0 10px ${themeColors.accentTextShadow}` }} transition={{ duration: 0.2 }}>Exercises</motion.a>
            <motion.a href="#diet" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2, textShadow: `0 0 10px ${themeColors.accentTextShadow}` }} transition={{ duration: 0.2 }}>Diet Plans</motion.a>
            <motion.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2, textShadow: `0 0 10px ${themeColors.accentTextShadow}` }} transition={{ duration: 0.2 }}>AI Assistant</motion.a>
            <motion.a href="#trainers" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2, textShadow: `0 0 10px ${themeColors.accentTextShadow}` }} transition={{ duration: 0.2 }}>Trainers</motion.a>
            <motion.a href="#contact" className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 146, 60, 0.3)", boxShadow: `0 0 20px ${themeColors.accentShadowStrong}` }} transition={{ duration: 0.2 }}>
              <LogIn className="h-4 w-4" /> Login
            </motion.a>
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`}
              whileHover={{ scale: 1.1, backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", boxShadow: `0 0 15px ${themeColors.accentShadow}` }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
            </motion.button>

            <div className="md:hidden flex items-center gap-2">
              <motion.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1, backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", boxShadow: `0 0 15px ${themeColors.accentShadow}` }} transition={{ duration: 0.2 }}>
                <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
              </motion.button>
              <motion.button onClick={() => setIsMobileOpen(v => !v)} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} aria-label="Open menu">
                {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
              </motion.button>
            </div>
          </div>
        </div>
        {isMobileOpen && (
          <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
            <div className="px-3 py-3 space-y-2">
              <motion.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Home</motion.a>
              <motion.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Exercises</motion.a>
              <motion.a href="#diet" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Diet Plans</motion.a>
              <motion.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>AI Assistant</motion.a>
              <motion.a href="#trainers" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Trainers</motion.a>
              <motion.a href="#contact" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>Login</motion.a>
            </div>
          </div>
        )}
      </header>

      <div className="px-6 py-8 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-8"
          style={{ textShadow: isDarkMode ? "0 0 20px rgba(16,185,129,0.6)" : "none" }}
        >
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent">GigaChat</span> – Your AI Fitness Assistant
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full max-w-2xl ${themeColors.cardBg} border ${themeColors.border} rounded-2xl shadow-xl backdrop-blur-md flex flex-col overflow-hidden`}
        >
        {/* Chat Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto h-96">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.sender === 'bot' ? 'items-start gap-3' : 'justify-end'}`}
            >
              {msg.sender === 'bot' && (
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Robot Icon" className="w-8 h-8" />
              )}
              <p className={`p-3 rounded-lg text-sm leading-relaxed shadow-md ${msg.sender === 'bot' ? 'italic tracking-wide ' + themeColors.cardBg + ' ring-1 ' + themeColors.border : themeColors.accentBg + ' ring-1 ' + themeColors.accentRing}`}>{msg.text}</p>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className={`flex items-center gap-3 p-4 border-t ${themeColors.border} ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/60'}`}>
          <input
            type="text"
            placeholder="Ask GigaChat anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${themeColors.accentBg} ${themeColors.accent} ring-1 ${themeColors.accentRing} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        </motion.div>
      </div>
    </div>
  );
}


