import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

/**
 * CopyButton — copies given text to clipboard with visual feedback
 * @param {string} text - Text to copy
 * @param {string} label - Button label
 * @param {string} id - Unique button ID for testing
 */
export default function CopyButton({ text, label = "Copy", id }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      id={id}
      onClick={handleCopy}
      className="btn-ghost flex items-center gap-2 px-4 py-2 text-sm"
      whileTap={{ scale: 0.95 }}
      style={{ minWidth: 130 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ color: "#34d399" }}
          >
            <Check size={14} />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Copy size={14} />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
