import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, approvedCount, rejectedCount }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card relative z-10 w-full max-w-md p-6 flex flex-col gap-6"
            style={{
              background: "rgba(15, 15, 20, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col gap-3 text-center items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ background: "rgba(139, 92, 246, 0.1)" }}
              >
                <AlertCircle size={24} style={{ color: "var(--color-purple-400)" }} />
              </div>
              <h3 className="text-xl font-semibold text-white">Confirm Review</h3>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                You approved <strong style={{ color: "#34d399" }}>{approvedCount}</strong> clips and rejected{" "}
                <strong style={{ color: "#f87171" }}>{rejectedCount}</strong> clips.
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Continue to the next step?
              </p>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "var(--color-text-primary)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="btn-gradient flex-1 py-2.5 rounded-xl text-sm font-medium"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
