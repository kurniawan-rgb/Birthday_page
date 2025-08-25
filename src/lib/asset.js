// runtime helper to prefix public asset paths with NEXT_PUBLIC_BASE_PATH when needed
// keeps local dev working (no prefix) and prepends the repo base when built for GH Pages
export function asset(path) {
  if (!path) return "";
  // if it's already an absolute URL, return unchanged
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "";

  // if path already begins with the base, return as-is
  if (base && path.startsWith(base)) return path;

  // ensure leading slash on path
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export default asset;
