// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    // JWT_KEY: process.env.JWT_KEY,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    SECRET_RTOKEN: process.env.SECRET_RTOKEN,
  },
};

module.exports = nextConfig;
