import { type BibleStudySession, type ProverbialDigest } from "@/lib/chapel-content";

const CONTENT_API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:5000/api/content";

async function requestContent<T>(type: string, options?: RequestInit) {
  const response = await fetch(`${CONTENT_API_URL}/${type}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Unable to reach the content server.");
  }
  return response.status === 204 ? undefined as T : (await response.json()) as T;
}

export function loadBibleStudySessions() {
  return requestContent<BibleStudySession[]>("bible-study");
}

export function createBibleStudySession(session: BibleStudySession) {
  return requestContent<BibleStudySession>("bible-study", { method: "POST", body: JSON.stringify(session) });
}

export function deleteBibleStudySession(id: string) {
  return requestContent<null>(`bible-study/${id}`, { method: "DELETE" });
}

export function loadProverbialDigests() {
  return requestContent<ProverbialDigest[]>("proverbial-digest");
}

export function createProverbialDigest(digest: ProverbialDigest) {
  return requestContent<ProverbialDigest>("proverbial-digest", { method: "POST", body: JSON.stringify(digest) });
}

export function deleteProverbialDigest(id: string) {
  return requestContent<null>(`proverbial-digest/${id}`, { method: "DELETE" });
}