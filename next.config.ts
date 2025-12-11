import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
    // 图片优化配置
    images: {
        unoptimized: true, // Cloudflare 不支持内置图片优化
        // 或使用 Cloudflare Images
    },
};

export default nextConfig;

// 本地开发时集成 OpenNext Cloudflare
initOpenNextCloudflareForDev();
