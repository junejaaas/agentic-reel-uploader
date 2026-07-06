import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, ArrowRight, Loader2 } from "lucide-react";

export default function URLInput({ onSubmit, isLoading = false }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateUrl = (val) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
    return pattern.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a YouTube URL");
      inputRef.current?.focus();
      return;
    }
    if (!validateUrl(trimmed)) {
      setError("Please enter a valid YouTube video URL");
      inputRef.current?.focus();
      return;
    }
    setError("");
    onSubmit(trimmed);
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" id="url-form">
      {/* Input row */}
      <div className="relative flex flex-col sm:flex-row gap-3">
        {/* URL Input */}
        <div className="relative flex-1">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Youtube size={18} />
          </div>
          <input
            ref={inputRef}
            id="youtube-url-input"
            type="url"
            value={url}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            disabled={isLoading}
            className="input-dark pl-11 pr-4 py-4 text-sm"
            style={{ fontSize: "0.9rem" }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Submit button */}
        <motion.button
          id="generate-shorts-btn"
          type="submit"
          disabled={isLoading || !url.trim()}
          className="btn-gradient px-6 py-4 text-sm flex items-center justify-center gap-2 min-w-[180px]"
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Generate Shorts</span>
                <ArrowRight size={16} />
              </>
            )}
          </span>
        </motion.button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2.5 text-xs flex items-center gap-1.5"
            style={{ color: "#f87171" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
