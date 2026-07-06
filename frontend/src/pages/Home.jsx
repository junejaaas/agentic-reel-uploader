import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Scissors, MessageSquare } from "lucide-react";
import URLInput from "../components/URLInput";

const features = [
  { icon: <TrendingUp size={16} />, label: "AI Highlight Detection" },
  { icon: <Scissors size={16} />, label: "Auto Clip Creation" },
  { icon: <MessageSquare size={16} />, label: "Caption Generation" },
  { icon: <Sparkles size={16} />, label: "Viral Score Ranking" },
];

/**
 * Home page — user pastes a YouTube URL and submits.
 * Immediately navigates to /processing where the API call is made.
 * onJobStart stores the URL in app state for Processing to consume.
 */
export default function Home({ onJobStart }) {
  const navigate = useNavigate();

  const handleSubmit = (url) => {
    onJobStart(url);
    navigate("/processing");
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-grid overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background orbs */}
      <div
        className="orb w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(124, 58, 237, 0.07)" }}
      />
      <div
        className="orb w-72 h-72 bottom-10 left-10"
        style={{ background: "rgba(59, 130, 246, 0.05)" }}
      />
      <div
        className="orb w-60 h-60 top-20 right-10"
        style={{ background: "rgba(139, 92, 246, 0.05)" }}
      />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-12">
        {/* Header */}
        <motion.div
          className="text-center flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              color: "var(--color-purple-400)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Zap size={12} />
            Powered by LangGraph + Groq
          </motion.div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl font-bold leading-tight text-balance"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span className="gradient-text">AI Shorts</span>
            <br />
            <span style={{ color: "var(--color-text-primary)" }}>Agent</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg max-w-md text-balance leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Turn long YouTube videos into AI-generated Shorts.
            <br />
            Powered by Groq, Whisper, and LangGraph.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            {features.map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <span style={{ color: "var(--color-purple-400)" }}>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Input card */}
        <motion.div
          className="glass-card w-full p-8 glow-purple"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-3 mb-6">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
            >
              Generate Shorts
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Paste any YouTube video URL and let AI find the best moments.
            </p>
          </div>

          <URLInput onSubmit={handleSubmit} />

          {/* Hint */}
          <p className="mt-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
            Supports YouTube videos and Shorts. Processing takes 2–5 minutes.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="text-center text-xs mb-4 uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            How it works
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { step: "01", title: "Paste URL", desc: "Drop your YouTube link" },
              { step: "02", title: "AI Analyzes", desc: "Transcript + highlights" },
              { step: "03", title: "Clips Created", desc: "Best moments extracted" },
              { step: "04", title: "Download", desc: "Ready-to-post Shorts" },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div
                  className="text-xs font-bold mb-2"
                  style={{ color: "var(--color-purple-400)" }}
                >
                  {item.step}
                </div>
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
