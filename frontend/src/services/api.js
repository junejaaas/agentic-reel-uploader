import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 600000, // 10 minutes — video processing can take a while
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — placeholder for future auth headers
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

/**
 * Submit a YouTube URL for AI processing.
 * Returns the full result synchronously (no polling needed).
 *
 * @param {string} youtubeUrl
 * @returns {Promise<{ status: string, highlights: Array }>}
 */
export const processVideo = async (youtubeUrl) => {
  const response = await api.post("/process", { youtube_url: youtubeUrl });
  return response.data;
};

/**
 * Resolve a clip_path from the backend into a full playable URL.
 * clip_path is a relative path like "storage/clips/clip_1.mp4"
 *
 * @param {string} clipPath
 * @returns {string}
 */
export const resolveClipUrl = (clipPath) => {
  if (!clipPath) return null;
  // If already an absolute URL, return as-is
  if (clipPath.startsWith("http://") || clipPath.startsWith("https://")) {
    return clipPath;
  }
  // Prepend backend base URL
  return `${BASE_URL}/${clipPath.replace(/^\//, "")}`;
};

// ─── Future-ready stubs (not yet implemented in backend) ──────────────────────

/**
 * [FUTURE] Approve or reject a highlight for posting.
 * Placeholder for Human-in-the-Loop / LangGraph interrupt support.
 */
// export const approveHighlight = async (jobId, highlightIndex, approved) => { ... };

/**
 * [FUTURE] Update caption for a highlight before posting.
 * Placeholder for caption editing support.
 */
// export const updateCaption = async (jobId, highlightIndex, caption) => { ... };

/**
 * [FUTURE] Post an approved clip to Instagram.
 * Placeholder for social media integration.
 */
// export const postToInstagram = async (jobId, highlightIndex) => { ... };

/**
 * [FUTURE] Fetch workflow history / past jobs.
 * Placeholder for job history page.
 */
// export const getJobHistory = async () => { ... };

/**
 * [FUTURE] Get live job status for a running job.
 * Placeholder for real-time status polling or WebSocket.
 */
// export const getJobStatus = async (jobId) => { ... };

export default api;
