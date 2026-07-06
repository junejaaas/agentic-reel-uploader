import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  TrendingUp,
  Lightbulb,
  Download,
  Hash,
  Sparkles,
} from "lucide-react";
import Badge from "./Badge";
import CopyButton from "./CopyButton";
import TranscriptAccordion from "./TranscriptAccordion";
import StatusBadge from "./StatusBadge";
import ApprovalButtons from "./ApprovalButtons";
import { resolveClipUrl } from "../services/api";

function formatDuration(start, end) {
  const dur = end - start;
  const s = Math.floor(dur % 60);
  const m = Math.floor(dur / 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function getScoreColor(score) {
  if (score >= 90) return { color: "#fbbf24", variant: "viral" };
  if (score >= 75) return { color: "#a78bfa", variant: "score" };
  return { color: "#60a5fa", variant: "reason" };
}

export default function ClipCard({ clip, index, onUpdateStatus }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const duration = formatDuration(clip.start, clip.end);
  const { color: scoreColor, variant: scoreVariant } = getScoreColor(clip.viral_score);
  const status = clip.status || "pending";

  // Resolve relative clip_path to a full URL served by the FastAPI backend
  const videoUrl = resolveClipUrl(clip.clip_path);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = `${clip.title || "clip"}.mp4`;
      a.click();
    }
  };

  return (
    <motion.article
      className="glass-card overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      style={{
        border: status === "approved" ? "1px solid rgba(52, 211, 153, 0.5)" : status === "rejected" ? "1px solid rgba(248, 113, 113, 0.5)" : "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: status === "approved" ? "0 4px 20px rgba(52, 211, 153, 0.1)" : status === "rejected" ? "0 4px 20px rgba(248, 113, 113, 0.1)" : "none",
        filter: status === "pending" ? "brightness(0.95)" : "none",
      }}
      id={`clip-card-${index}`}
      aria-label={`Clip: ${clip.title}`}
    >
      {/* Video preview */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "9/16",
          maxHeight: "380px",
          background:
            "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)",
        }}
      >
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls={false}
          />
        ) : (
          /* No clip path returned — backend may not have generated a video file yet */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse-glow"
              style={{ background: "rgba(139, 92, 246, 0.15)" }}
            >
              <Play size={24} style={{ color: "var(--color-purple-400)" }} />
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Preview unavailable
            </p>
          </div>
        )}

        {/* Viral score overlay */}
        <div className="absolute top-3 left-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              color: scoreColor,
              border: `1px solid ${scoreColor}30`,
            }}
          >
            <TrendingUp size={12} />
            {clip.viral_score}% Viral
          </div>
        </div>

        {/* Duration and Status badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          <StatusBadge status={status} />
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              color: "var(--color-text-secondary)",
            }}
          >
            <Clock size={11} />
            {duration}
          </div>
        </div>

        {/* Play/pause overlay — only shown when video is available */}
        {videoUrl && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} color="white" fill="white" />
            </motion.div>
          </button>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={scoreVariant} icon={<TrendingUp size={11} />}>
            {clip.viral_score}% Viral Score
          </Badge>
          <Badge variant="reason" icon={<Lightbulb size={11} />}>
            {clip.reason}
          </Badge>
        </div>

        {/* Title */}
        <div>
          <p
            className="text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Sparkles size={10} style={{ color: "var(--color-purple-400)" }} />
            AI Title
          </p>
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
          >
            {clip.title}
          </h3>
        </div>

        {/* Caption */}
        <div
          className="p-3.5 rounded-xl"
          style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs mb-1.5 font-medium" style={{ color: "var(--color-text-muted)" }}>
            Caption
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {clip.caption}
          </p>
        </div>

        {/* Hashtags */}
        <div>
          <p
            className="text-xs mb-2 font-medium flex items-center gap-1.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Hash size={12} />
            Hashtags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {clip.hashtags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(139, 92, 246, 0.08)",
                  color: "var(--color-purple-400)",
                  border: "1px solid rgba(139, 92, 246, 0.18)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Transcript accordion */}
        <TranscriptAccordion
          transcript={clip.transcript}
          id={`transcript-${index}`}
        />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <CopyButton
            id={`copy-caption-${index}`}
            text={clip.caption}
            label="Copy Caption"
          />
          <CopyButton
            id={`copy-hashtags-${index}`}
            text={clip.hashtags?.join(" ") || ""}
            label="Copy Hashtags"
          />
          <motion.button
            id={`download-clip-${index}`}
            onClick={handleDownload}
            disabled={!videoUrl}
            className="btn-gradient flex items-center gap-2 px-4 py-2 text-sm"
            whileTap={{ scale: 0.95 }}
            style={{ opacity: videoUrl ? 1 : 0.4 }}
          >
            <span className="flex items-center gap-2">
              <Download size={14} />
              Download
            </span>
          </motion.button>
        </div>

        {/* Approval buttons */}
        <div className="pt-3 mt-1" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <ApprovalButtons status={status} onUpdateStatus={onUpdateStatus} />
        </div>
      </div>
    </motion.article>
  );
}
