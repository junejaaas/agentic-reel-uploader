import { Zap, Github, Twitter } from "lucide-react";

const techStack = [
  { name: "LangGraph", color: "#a78bfa" },
  { name: "Groq", color: "#60a5fa" },
  { name: "Faster Whisper", color: "#a78bfa" },
  { name: "FFmpeg", color: "#60a5fa" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(10, 10, 15, 0.8)",
        borderTop: "1px solid rgba(139, 92, 246, 0.1)",
      }}
      className="mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
              }}
            >
              <Zap size={14} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold gradient-text">AI Shorts Agent</span>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
              Built with
            </span>
            {techStack.map((tech, i) => (
              <span key={tech.name} className="flex items-center gap-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    color: tech.color,
                    background: `${tech.color}14`,
                    border: `1px solid ${tech.color}25`,
                  }}
                >
                  {tech.name}
                </span>
                {i < techStack.length - 1 && (
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.6rem" }}>
                    •
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} AI Shorts Agent
          </p>
        </div>
      </div>
    </footer>
  );
}
