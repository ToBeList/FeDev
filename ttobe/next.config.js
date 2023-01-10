/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `http://tobelist.duckdns.org/:path*`,
        },
      ]
    };
  },
};

module.exports = nextConfig;
