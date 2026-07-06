import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ApprovalButtons({ status, onUpdateStatus }) {
  const isApproved = status === "approved";
  const isRejected = status === "rejected";

  return (
    <div className="flex gap-3 w-full mt-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onUpdateStatus(isApproved ? "pending" : "approved")}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors duration-200"
        style={{
          border: isApproved ? "1px solid #34d399" : "1px solid rgba(52, 211, 153, 0.4)",
          background: isApproved ? "rgba(52, 211, 153, 0.2)" : "transparent",
          color: isApproved ? "#34d399" : "var(--color-text-secondary)",
        }}
      >
        <Check size={16} />
        Approve
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onUpdateStatus(isRejected ? "pending" : "rejected")}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors duration-200"
        style={{
          border: isRejected ? "1px solid #f87171" : "1px solid rgba(248, 113, 113, 0.4)",
          background: isRejected ? "rgba(248, 113, 113, 0.2)" : "transparent",
          color: isRejected ? "#f87171" : "var(--color-text-secondary)",
        }}
      >
        <X size={16} />
        Reject
      </motion.button>
    </div>
  );
}
