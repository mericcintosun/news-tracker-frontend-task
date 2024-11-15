/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Tüm domainlere izin verir
      },
    ],
  },
};

export default nextConfig;
