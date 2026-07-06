import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Results", path: "/results" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Frosted glass bar */}
      <div
        style={{
          background: "rgba(10, 10, 15, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
                boxShadow: "0 0 16px rgba(124, 58, 237, 0.5)",
              }}
            >
              <Zap size={16} color="white" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-bold tracking-tight gradient-text"
              style={{ letterSpacing: "-0.01em" }}
            >
              AI Shorts Agent
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--color-purple-400)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(139, 92, 246, 0.12)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
