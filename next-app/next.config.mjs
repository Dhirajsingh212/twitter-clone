/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
