/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilitar verificação do ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
