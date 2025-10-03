import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mju.ac.th",
        port: "",
        pathname: "/th/images/**", // ตรงกับ path ของโลโก้
      },
      {
        protocol: "https",
        hostname: "www.truedigitalpark.com",
        port: "",
        pathname: "/public/uploads/meeting-room/**", // ตรงกับ path ของรูปห้อง
      },
    ],
  },
};

export default nextConfig;
