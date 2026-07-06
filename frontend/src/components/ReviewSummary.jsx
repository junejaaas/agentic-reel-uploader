import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, LayoutGrid } from "lucide-react";

export default function ReviewSummary({ counts }) {
  const stats = [
    {
      label: "Total Clips",
      value: counts.total,
      icon: <LayoutGrid size={16} />,
      color: "var(--color-text-primary)",
      iconColor: "var(--color-purple-400)",
    },
    {
      label: "Approved",
      value: counts.approved,
      icon: <CheckCircle2 size={16} />,
      color: "#34d399",
      iconColor: "#34d399",
    },
    {
      label: "Rejected",
      value: counts.rejected,
      icon: <XCircle size={16} />,
      color: "#f87171",
      iconColor: "#f87171",
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: <Clock size={16} />,
      color: "var(--color-text-secondary)",
      iconColor: "var(--color-text-muted)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-8 p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
        Review Generated Shorts
      </h2>
      <div className="flex flex-wrap gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex-1 min-w-[120px] rounded-xl p-4 flex flex-col gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="flex items-center gap-2" style={{ color: stat.iconColor }}>
              {stat.icon}
              <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
