import withBundleAnalyzer from '@next/bundle-analyzer';
import { RemotePattern } from 'next/dist/shared/lib/image-config'; // 👈 import ให้ตรง type

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        pathname: '/**',
      },
    ] as RemotePattern[], // 👈 cast type ตรงนี้
  },
};

export default analyzer(nextConfig);
