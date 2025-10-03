import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.mju.ac.th', 'www.truedigitalpark.com'], // ✅ ใส่ทุกโดเมนที่ใช้ <Image>
  },
};

export default nextConfig;
