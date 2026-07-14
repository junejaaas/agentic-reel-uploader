import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Processing from "./pages/Processing";
import Results from "./pages/Results";
import Success from "./pages/Success";

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes({ youtubeUrl, setYoutubeUrl, jobResult, setJobResult }) {
  const location = useLocation();

  const isProcessing = location.pathname === "/processing";

  return (
    <>
      {/* Navbar hidden on /processing for immersive loading */}
      {!isProcessing && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home
                  onJobStart={(url) => {
                    setYoutubeUrl(url);
                  }}
                />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/processing"
            element={
              <PageTransition>
                <Processing
                  youtubeUrl={youtubeUrl}
                  onResultReady={(result) => setJobResult(result)}
                />
              </PageTransition>
            }
          />
          <Route
            path="/results"
            element={
              <PageTransition>
                <Results jobResult={jobResult} />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/success"
            element={
              <PageTransition>
                <Success />
                <Footer />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [jobResult, setJobResult] = useState(null);

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--color-bg-primary)",
        }}
      >
        <AppRoutes
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          jobResult={jobResult}
          setJobResult={setJobResult}
        />
      </div>
    </BrowserRouter>
  );
}
