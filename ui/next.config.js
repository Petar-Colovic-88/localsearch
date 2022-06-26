/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    api: {
      url: process.env.API_URL || "http://localhost:3001/",
    },
  },
};

module.exports = nextConfig;
