import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents:true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/500/**",
      },
      {
        protocol: "https",
        hostname: "kindhearted-cuttlefish-594.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
