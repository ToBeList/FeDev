/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // 이 부분 나중에 에러 발생할 가능성 있음. proxy 환경과 개발환경이 다르기 때문에
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `http://ttobelist.duckdns.org/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
