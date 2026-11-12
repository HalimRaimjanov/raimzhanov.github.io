/** Accept actual YouTube hosts only, including watch, Shorts and share URLs. */
export function getYouTubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const segments = url.pathname.split("/").filter(Boolean);
    let id: string | null = null;

    if (host === "youtu.be") {
      id = segments[0] || null;
    } else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)) {
      id = segments[0] === "watch"
        ? url.searchParams.get("v")
        : ["shorts", "embed", "live"].includes(segments[0])
          ? segments[1] || null
          : null;
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
