import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.21"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.AWS_ENDPOINT_URL_S3!).hostname,
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
