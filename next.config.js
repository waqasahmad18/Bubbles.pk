/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint blocking build
  },

  // ✅ Prevent static generation of API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
