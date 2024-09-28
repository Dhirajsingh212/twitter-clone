/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ["res.cloudinary.com", "i.pinimg.com"],
  },
};

export default nextConfig;
