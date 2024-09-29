/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
