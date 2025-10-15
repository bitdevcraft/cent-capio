import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cent-auth", "@repo/cent-database"],
  sassOptions: {
    implementation: "sass-embedded",
  },
  images: {
    remotePatterns: [
      new URL(
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
      ),
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
