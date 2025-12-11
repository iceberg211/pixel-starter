import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // 使用默认配置
  // 可选：配置 R2 增量缓存
  // incrementalCache: r2IncrementalCache,
});
