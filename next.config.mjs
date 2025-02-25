/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", 'i.imgur.com'],
  },
  // TODO - check
  serverActions: {
    bodySizeLimit: '5mb'
  }
};

export default nextConfig;