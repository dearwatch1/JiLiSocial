/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // In some local networks, remote image fetching by Next optimizer is unstable.
    // Skip optimization in development to avoid intermittent ECONNRESET 500 errors.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
