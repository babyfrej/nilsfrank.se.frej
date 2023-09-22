const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  experimental: {
    serverActions: true,
  },
};

module.exports = withVanillaExtract(nextConfig);
