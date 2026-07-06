import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useVideoProcess } from "../hooks/useVideoProcess";

/**
 * Processing page — shown immediately after the user submits a URL.
 * Calls the real backend API and navigates to /results on success,
 * or navigates back to / with an error state on failure.
 *
 * No mock data. No setTimeout. No fake progress.
 */
export default function Processing({ youtubeUrl, onResultReady }) {
  const navigate = useNavigate();
  const { submit } = useVideoProcess();
  const hasStarted = useRef(false);

  useEffect(() => {
    // Guard against double-invocation in React Strict Mode
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (!youtubeUrl) {
      // If we somehow arrive here without a URL, go back home
      navigate("/");
      return;
    }

    const run = async () => {
      const data = await submit(youtubeUrl);

      if (data) {
        onResultReady(data);
        navigate("/results");
      } else {
        // On error, surface it on the results page so user can retry
        onResultReady({ error: true });
        navigate("/results");
      }
    };

    run();
  }, [youtubeUrl, navigate, onResultReady, submit]);

  return <LoadingScreen />;
}
