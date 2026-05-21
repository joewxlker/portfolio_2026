import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_SERVER_PROTOCOL,
        hostname: process.env.IMAGE_SERVER_HOSTNAME,
      } as URL,
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
    qualities: [50, 60],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development"
  },
};

export default nextConfig;
