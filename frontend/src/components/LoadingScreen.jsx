import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

/**
 * LoadingScreen — displayed while the backend is processing the video.
 * Single clean spinner with a fixed status message.
 * No fake progress steps or timers.
 */
export default function LoadingScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-grid"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background orbs */}
      <div
        className="orb w-96 h-96 -top-20 -left-20"
        style={{ background: "rgba(124, 58, 237, 0.06)" }}
      />
      <div
        className="orb w-64 h-64 bottom-20 right-10"
        style={{ background: "rgba(59, 130, 246, 0.05)" }}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md"
        >
          {/* Spinner */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#7c3aed",
                borderRightColor: "#7c3aed44",
              }}
            />
            {/* Middle ring */}
            <div
              className="absolute inset-3 rounded-full animate-spin-reverse"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#3b82f6",
                borderLeftColor: "#3b82f644",
              }}
            />
            {/* Inner glow */}
            <div
              className="w-10 h-10 rounded-full animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 100%)",
              }}
            />
          </div>

          {/* Status text */}
          <div className="text-center flex flex-col items-center gap-2">
            <p
              className="text-2xl font-semibold gradient-text"
              style={{ letterSpacing: "-0.01em" }}
            >
              Generating AI Shorts...
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Hang tight — this usually takes 2–5 minutes.
            </p>
          </div>

          {/* Info card */}
          <div
            className="glass-card px-5 py-4 text-center w-full"
            style={{ borderColor: "rgba(139, 92, 246, 0.1)" }}
          >
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              AI is transcribing and analyzing your video,
              <br />
              then finding the most{" "}
              <span style={{ color: "var(--color-purple-400)" }}>
                viral moments
              </span>{" "}
              to clip.
            </p>
          </div>

          {/* Subtle bottom indicator */}
          <div className="flex items-center gap-2">
            <Loader2
              size={14}
              className="animate-spin"
              style={{ color: "var(--color-purple-400)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              Processing your video
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
