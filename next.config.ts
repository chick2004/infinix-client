import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Hoặc 'https' nếu bạn sử dụng https
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/media/storage/uploads/**', // Đảm bảo đúng đường dẫn tới ảnh
      },
    ],
  },
};

export default nextConfig;
