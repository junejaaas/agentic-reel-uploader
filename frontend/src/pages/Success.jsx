import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 bg-grid"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <motion.div
        className="glass-card flex flex-col items-center justify-center py-16 px-8 gap-6 max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
          style={{ background: "rgba(34, 197, 94, 0.1)" }}
        >
          <CheckCircle size={40} style={{ color: "#22c55e" }} />
        </div>
        
        <div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            ✅ Reels Uploaded Successfully
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Your approved reels have been uploaded to Instagram.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 mt-4">
          <button
            onClick={() => navigate("/")}
            className="btn-gradient px-6 py-3 text-sm font-medium rounded-xl w-full"
          >
            Generate Another
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-sm font-medium rounded-xl w-full transition-colors hover:bg-white/10"
            style={{ 
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--color-text-primary)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            Home
          </button>
        </div>
      </motion.div>
    </main>
  );
}
