/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'healthcare-backend-5y5b.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
