/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: false,
    turbo: {
      resolveAlias: {}
    }
  }
};

export default nextConfig;
