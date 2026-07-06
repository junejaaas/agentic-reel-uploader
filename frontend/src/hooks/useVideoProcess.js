import { useState, useCallback } from "react";
import { processVideo } from "../services/api";

/**
 * useVideoProcess — manages the full video submission lifecycle.
 * Calls POST /process and stores the returned highlights.
 * No polling, no mock data — result comes back in a single response.
 */
export function useVideoProcess() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submit = useCallback(async (youtubeUrl) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await processVideo(youtubeUrl);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong while processing the video.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return { submit, isLoading, error, result, reset };
}

/**
 * useClipboard — simplified clipboard hook
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout]
  );

  return { copied, copy };
}
