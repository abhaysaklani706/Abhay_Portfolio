/** @type {import('next').NextConfig} */

const nextConfig = {
output: "export",
distDir: "dist",
trailingSlash: true,

webpack: (config, { isServer }) => {
if (!isServer) {
config.resolve.fallback = {
fs: false,
};

  config.optimization.splitChunks = {
    chunks: "all",
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        priority: -10,
        chunks: "all",
      },
    },
  };
}

return config;

},

turbopack: {},

images: {
unoptimized: true,

remotePatterns: [
  {
    protocol: "https",
    hostname: "images.higgs.ai",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "d8j0ntlcm91z4.cloudfront.net",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
],

formats: ["image/webp", "image/avif"],
minimumCacheTTL: 31536000,
dangerouslyAllowSVG: true,
contentSecurityPolicy:
  "default-src 'self'; script-src 'none'; sandbox;",
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

},

compress: true,
poweredByHeader: false,
generateEtags: false,
reactStrictMode: false,

experimental: {
optimizePackageImports: [
"framer-motion",
"react-icons",
],
optimizeCss: true,
scrollRestoration: true,
},

compiler: {
removeConsole:
process.env.NODE_ENV === "production",
},

onDemandEntries: {
maxInactiveAge: 25000,
pagesBufferLength: 2,
},
};

module.exports = nextConfig;
