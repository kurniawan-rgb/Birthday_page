export function asset(path) {
  // in development return paths unchanged so local server and tools (next dev) resolve them normally
  const isProd = typeof process !== "undefined" && process.env.NODE_ENV === "production";
  const base = isProd && typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : "";

  if (!path) return base || "";
  if (path.startsWith("http")) return path;

  // if path already begins with the base, return as-is
  if (base && path.startsWith(base)) return path;

  // absolute paths should be prefixed with the base
  if (path.startsWith("/")) return `${base}${path}`;

  // relative paths -> make absolute and prefix
  return `${base}/${path}`;
}
