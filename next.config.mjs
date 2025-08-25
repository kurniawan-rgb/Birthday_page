/** @type {import('next').NextConfig} */
const nextConfig = {
  // Menghasilkan folder 'out' yang berisi file HTML statis
  output: "export",

  // PENTING: Pastikan ini sudah benar sesuai nama repo Anda
  // basePath must start with a leading '/'. Use the repo name if deploying to GitHub Pages.
  basePath: "/Birthday_page", // Ganti '/nama-repo-anda' sesuai repo Anda

  // Diperlukan untuk Next.js Image component agar bekerja di GitHub Pages
  images: {
    unoptimized: true,
  },
  // When exporting for GitHub Pages, ensure assets are served from the repo path
  assetPrefix: "/Birthday_page",
  // produce files with trailing slash so GitHub Pages can serve index.html from folders
  trailingSlash: true,
};

// --- INI BAGIAN YANG DIPERBAIKI ---
// Kita ganti 'module.exports' dengan 'export default'
export default nextConfig;
