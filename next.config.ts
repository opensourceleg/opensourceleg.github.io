import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Static export configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Ensure Next.js knows the correct workspace root when multiple lockfiles exist
  // (silences the multiple-lockfile/inferred-root warning and keeps tracing deterministic)
  outputFileTracingRoot: __dirname,
  
  // React strict mode for better development experience
  reactStrictMode: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  }
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
