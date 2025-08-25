/** @type {import('next').NextConfig} */
const nextConfig = {
  // Menghasilkan folder 'out' yang berisi file HTML statis
  output: "export",

  // PENTING: Ganti 'nama-repo-anda' dengan nama repository GitHub Anda!
  // Contoh: jika repo Anda adalah https://github.com/username/ultah-pacar
  // maka isinya adalah '/ultah-pacar'
  basePath: "/nama-repo-anda",

  // Diperlukan untuk Next.js Image component agar bekerja di GitHub Pages
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
