/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:3000"
        : "http://127.0.0.1:3000",
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    // JWT_KEY: process.env.JWT_KEY,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    SECRET_RTOKEN: process.env.SECRET_RTOKEN,
  },
};

module.exports = nextConfig;
