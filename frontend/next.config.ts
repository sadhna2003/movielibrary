import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
   domains: [
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
      "encrypted-tbn0.gstatic.com",
      "encrypted-tbn1.gstatic.com",
    ], // <--- only hostname, no protocol
  },
};

export default nextConfig;
