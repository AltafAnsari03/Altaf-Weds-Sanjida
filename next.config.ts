import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Altaf-Weds-Sanjida",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;