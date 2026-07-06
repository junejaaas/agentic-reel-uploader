import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    pending: {
      color: "var(--color-text-secondary)",
      bg: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      icon: <Clock size={12} />,
      label: "Pending",
    },
    approved: {
      color: "#34d399", // Emerald 400
      bg: "rgba(52, 211, 153, 0.15)",
      border: "rgba(52, 211, 153, 0.3)",
      icon: <CheckCircle2 size={12} />,
      label: "Approved",
    },
    rejected: {
      color: "#f87171", // Red 400
      bg: "rgba(248, 113, 113, 0.15)",
      border: "rgba(248, 113, 113, 0.3)",
      icon: <XCircle size={12} />,
      label: "Rejected",
    },
  };

  const current = config[status] || config.pending;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md"
      style={{
        background: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`,
      }}
    >
      {current.icon}
      {current.label}
    </motion.div>
  );
}
