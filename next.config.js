/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'http://localhost:3000'
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    // JWT_KEY: process.env.JWT_KEY,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    SECRET_RTOKEN: process.env.SECRET_RTOKEN
  }
}

module.exports = nextConfig
