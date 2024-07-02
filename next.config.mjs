/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urbanlux.blob.core.windows.net',
      },
      {
        protocol: 'http',
        hostname: 'urbantrendz.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;
