import { motion } from "framer-motion";

/**
 * Badge component with preset variants
 * @param {"viral" | "score" | "reason" | "default"} variant
 */
export default function Badge({ children, variant = "default", icon }) {
  const styles = {
    viral: {
      background: "rgba(250, 204, 21, 0.12)",
      color: "#fbbf24",
      border: "1px solid rgba(251, 191, 36, 0.25)",
    },
    score: {
      background: "rgba(139, 92, 246, 0.15)",
      color: "#a78bfa",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
    reason: {
      background: "rgba(96, 165, 250, 0.1)",
      color: "#60a5fa",
      border: "1px solid rgba(96, 165, 250, 0.25)",
    },
    success: {
      background: "rgba(52, 211, 153, 0.12)",
      color: "#34d399",
      border: "1px solid rgba(52, 211, 153, 0.25)",
    },
    default: {
      background: "rgba(148, 163, 184, 0.08)",
      color: "var(--color-text-secondary)",
      border: "1px solid rgba(148, 163, 184, 0.15)",
    },
  };

  const style = styles[variant] || styles.default;

  return (
    <motion.span
      className="badge"
      style={style}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.span>
  );
}
