/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false,
  },
  images: {
    domains: ["res.cloudinary.com", "i.pinimg.com"],
  },
};

export default nextConfig;
