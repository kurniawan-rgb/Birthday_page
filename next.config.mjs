// next.config.mjs
/** @type {import('next').NextConfig} */
// Serve at root during development. When building for production (static export for GitHub Pages),
// set the repo base path. Update '/Birthday_page' to match your repo name when deploying.
const isProd = process.env.NODE_ENV === "production";
const REPO_BASE = isProd ? "/Birthday_page" : "";

const nextConfig = {
  output: "export",
  ...(REPO_BASE ? { basePath: REPO_BASE } : {}),
  ...(REPO_BASE ? { assetPrefix: REPO_BASE } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: !!REPO_BASE,
  env: {
    NEXT_PUBLIC_BASE_PATH: REPO_BASE,
  },
};

export default nextConfig;
