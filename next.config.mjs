/**
 * @file Next.js configuration file
 * This file configures Next.js for our SaaS application, including both the dashboard and the embeddable widget.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Widget specific configuration
    if (!isServer) {
      config.output.library = 'FeedbackWidget';
      config.output.libraryTarget = 'umd';
      config.output.globalObject = 'this';
    }

    return config;
  },
  async headers() {
    return [
      {
        source: '/widget.js',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
