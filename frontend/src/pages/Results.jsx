import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Clock,
  LayoutGrid,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import ClipCard from "../components/ClipCard";
import ReviewSummary from "../components/ReviewSummary";
import ConfirmationModal from "../components/ConfirmationModal";
import { AnimatePresence } from "framer-motion";
import { approveHighlights } from "../services/api";

/**
 * Results page — displays the highlights returned by the backend.
 *
 * jobResult shape (from POST /process):
 *   { status: "success", highlights: [...] }
 *
 * Error shape (set by Processing.jsx on failure):
 *   { error: true }
 */
export default function Results({ jobResult }) {
  const navigate = useNavigate();
  const [clips, setClips] = useState(() => (jobResult?.highlights || []).map(h => ({ ...h, status: h.status || "pending" })));
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (jobResult?.highlights) {
      setClips(jobResult.highlights.map(h => ({ ...h, status: h.status || "pending" })));
    }
  }, [jobResult]);

  const handleUpdateStatus = (index, newStatus) => {
    setClips(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], status: newStatus };
      return copy;
    });
  };

  const counts = {
    total: clips.length,
    approved: clips.filter(c => c.status === "approved").length,
    rejected: clips.filter(c => c.status === "rejected").length,
    pending: clips.filter(c => c.status === "pending").length,
  };

  const handleContinueClick = () => {
    if (counts.pending > 0) {
      setToastMsg("Please review every generated clip.");
      setTimeout(() => setToastMsg(null), 3000);
      return;
    }
    setShowModal(true);
  };

  const handleConfirmContinue = async () => {
    setShowModal(false);
    setIsUploading(true);
    try {
      await approveHighlights(jobResult?.thread_id, clips);
      navigate("/success");
    } catch (error) {
      console.error("Upload error:", error);
      setToastMsg("Instagram upload failed.");
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  // ── Error state ─────────────────────────────────────────────────────────────
  if (jobResult?.error) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6 bg-grid"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <motion.div
          className="glass-card flex flex-col items-center justify-center py-16 px-8 gap-5 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(239, 68, 68, 0.12)" }}
          >
            <AlertTriangle size={28} style={{ color: "#f87171" }} />
          </div>
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Something went wrong
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Something went wrong while processing the video. Please check the
              URL and try again.
            </p>
          </div>
          <button
            id="retry-btn"
            onClick={() => navigate("/")}
            className="btn-gradient px-6 py-3 text-sm flex items-center gap-2"
          >
            <span className="flex items-center gap-2">
              <RefreshCw size={15} />
              Retry
            </span>
          </button>
        </motion.div>
      </main>
    );
  }

  // ── No result yet (user navigated directly) ──────────────────────────────────
  if (!jobResult) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6 bg-grid"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <motion.div
          className="glass-card flex flex-col items-center justify-center py-16 px-8 gap-5 max-w-md w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(139, 92, 246, 0.1)" }}
          >
            <Sparkles size={28} style={{ color: "var(--color-purple-400)" }} />
          </div>
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              No results yet
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Submit a YouTube URL on the Home page to get started.
            </p>
          </div>
          <button
            id="go-home-btn"
            onClick={() => navigate("/")}
            className="btn-gradient px-6 py-3 text-sm"
          >
            <span>Go to Home</span>
          </button>
        </motion.div>
      </main>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  const highlights = clips;
  const avgScore =
    highlights.length > 0
      ? Math.round(
          highlights.reduce((s, h) => s + h.viral_score, 0) / highlights.length
        )
      : 0;

  return (
    <main
      className="min-h-screen px-4 sm:px-6 pb-24 bg-grid"
      style={{
        background: "var(--color-bg-primary)",
        paddingTop: "96px", // account for fixed navbar
      }}
    >
      {/* Background orb */}
      <div
        className="orb w-96 h-96 -top-20 right-0 pointer-events-none"
        style={{ background: "rgba(124, 58, 237, 0.05)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <button
            id="back-to-home-btn"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm mb-6 transition-colors duration-200 group"
            style={{
              color: "var(--color-text-muted)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to Home
          </button>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold gradient-text mb-2"
                style={{ letterSpacing: "-0.025em" }}
              >
                Generated Clips
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {highlights.length > 0
                  ? `${highlights.length} clip${highlights.length === 1 ? "" : "s"} generated from your video`
                  : "No shorts were generated."}
              </p>
            </div>

            {/* Stats row */}
            {highlights.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    icon: <LayoutGrid size={14} />,
                    label: "Total Clips",
                    value: highlights.length,
                  },
                  {
                    icon: <TrendingUp size={14} />,
                    label: "Avg. Viral Score",
                    value: `${avgScore}%`,
                  },
                  {
                    icon: <Clock size={14} />,
                    label: "Best Score",
                    value: `${Math.max(...highlights.map((h) => h.viral_score))}%`,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card px-4 py-3 flex items-center gap-3"
                    style={{ minWidth: 130 }}
                  >
                    <span style={{ color: "var(--color-purple-400)" }}>{stat.icon}</span>
                    <div>
                      <p
                        className="text-lg font-bold"
                        style={{
                          color: "var(--color-text-primary)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Highlights grid */}
        {highlights.length > 0 ? (
          <div className="flex flex-col gap-8">
            <ReviewSummary counts={counts} />
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
            >
              {highlights.map((clip, index) => (
                <ClipCard 
                  key={index} 
                  clip={clip} 
                  index={index} 
                  onUpdateStatus={(status) => handleUpdateStatus(index, status)}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleContinueClick}
                disabled={counts.pending > 0 || isUploading}
                className="btn-gradient px-8 py-3.5 rounded-xl font-medium text-lg w-full max-w-sm transition-all duration-300"
                style={{
                  opacity: counts.pending === 0 && !isUploading ? 1 : 0.5,
                  cursor: counts.pending === 0 && !isUploading ? "pointer" : "not-allowed",
                  filter: counts.pending === 0 && !isUploading ? "none" : "grayscale(0.5)",
                }}
              >
                {isUploading ? "Uploading..." : "Continue"}
              </button>
            </div>
          </div>
        ) : (
          /* Empty state */
          <motion.div
            className="glass-card flex flex-col items-center justify-center py-24 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(139, 92, 246, 0.1)" }}
            >
              <Sparkles size={28} style={{ color: "var(--color-purple-400)" }} />
            </div>
            <div className="text-center">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                No shorts were generated.
              </h2>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Try a different video or a longer one with more content.
              </p>
            </div>
            <button
              id="try-again-btn"
              onClick={() => navigate("/")}
              className="btn-gradient px-6 py-3 text-sm mt-2"
            >
              <span>Try Another Video</span>
            </button>
          </motion.div>
        )}

        {/* ── Future feature placeholders ──────────────────────────────────────
          The section below is intentionally left as a placeholder for future features:
          - Human-in-the-Loop approval (LangGraph interrupts)
          - Caption editing per clip
          - Instagram / TikTok posting
          - Workflow history / job status panel
        ─────────────────────────────────────────────────────────────────────── */}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmContinue}
        approvedCount={counts.approved}
        rejectedCount={counts.rejected}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl flex items-center gap-3 font-medium text-sm"
            style={{
              background: "rgba(15, 15, 20, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              color: "var(--color-text-primary)",
            }}
          >
            <AlertTriangle size={16} style={{ color: "#fbbf24" }} />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
