// next.config.mjs
const isProd = process.env.NODE_ENV === "production";
// Prefer explicit env override; fallback to hard-coded repo name only in production
const REPO_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/Birthday_page" : "");

const nextConfig = {
  output: "export",

  // only set these when REPO_BASE is non-empty (production/export)
  ...(REPO_BASE ? { basePath: REPO_BASE, assetPrefix: REPO_BASE } : {}),

  images: {
    unoptimized: true,
  },

  trailingSlash: !!REPO_BASE,

  // expose to client code: asset() helper or client code can read NEXT_PUBLIC_BASE_PATH
  env: {
    NEXT_PUBLIC_BASE_PATH: REPO_BASE,
  },
};

export default nextConfig;
