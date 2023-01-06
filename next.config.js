const nextConfig = {
  env: {
    BASE_URL_API: process.env.BASE_URL_API,
  },
  reactStrictMode: true,
  images: {
    domains: [process.env.BASE_URL_API],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
