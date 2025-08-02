import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/cent-auth", "@repo/cent-database"],
  sassOptions: {
    implementation: "sass-embedded",
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
