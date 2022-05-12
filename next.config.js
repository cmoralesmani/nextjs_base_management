// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    JWT_KEY: process.env.JWT_KEY,
  },
};

module.exports = nextConfig;