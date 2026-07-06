import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";

/**
 * TranscriptAccordion — collapsible transcript section
 * @param {string} transcript
 */
export default function TranscriptAccordion({ transcript, id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(139, 92, 246, 0.12)",
        background: "rgba(255, 255, 255, 0.02)",
      }}
    >
      {/* Header */}
      <button
        id={id || "transcript-toggle"}
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200"
        style={{
          color: "var(--color-text-secondary)",
          cursor: "pointer",
          background: "transparent",
          border: "none",
        }}
      >
        <span className="flex items-center gap-2">
          <FileText size={14} style={{ color: "var(--color-purple-400)" }} />
          Transcript
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-4 pb-4 text-sm leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                borderTop: "1px solid rgba(139, 92, 246, 0.08)",
                paddingTop: "12px",
              }}
            >
              {transcript || "No transcript available for this clip."}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
