# Next.js 从 Vercel 迁移到 Cloudflare Pages

> **核心问题**：Next.js 是 Vercel 官方框架，为 Vercel 平台深度优化。要部署到 Cloudflare，需要通过适配层来"翻译"。

---

## 为什么需要适配？

### Vercel 的优势（原生支持）

Vercel 为 Next.js 做了这些工作：

1. **自动构建优化** - 直接识别 Next.js 项目，自动配置构建
2. **Edge Runtime** - 提供了 Next.js Edge Runtime 支持
3. **图片优化** - 内置图片优化 API (`next/image`)
4. **ISR 缓存** - 自动持久化增量静态再生的页面
5. **零配置部署** - `git push` 就能部署

### Cloudflare 的现状（需要适配）

Cloudflare Workers 是不同的运行时环境：

1. **不同的运行时** - Workers 运行时 ≠ Node.js ≠ Vercel Edge Runtime
2. **没有原生支持** - 不认识 Next.js 的构建产物
3. **需要转换** - `.next` 目录无法直接运行
4. **需要额外配置** - 图片、缓存、路由都要手动处理

---

## 适配方案：OpenNext Cloudflare

**OpenNext** 是一个适配器，作用是：

```
Next.js 构建产物 → OpenNext 转换 → Cloudflare Workers 可运行的代码
```

### 它解决了什么问题？

| 问题 | Vercel 怎么做 | Cloudflare 怎么适配 |
|------|--------------|-------------------|
| **运行时差异** | 原生 Node.js + Edge Runtime | OpenNext 转换为 Workers 兼容代码 |
| **路由系统** | 自动识别 Next.js 路由 | OpenNext 生成 Workers 路由规则 |
| **静态资源** | 自动托管到 CDN | OpenNext 输出到 `.open-next/assets` |
| **API Routes** | 直接运行 | OpenNext 转换为 Workers 函数 |
| **图片优化** | 内置优化 API | 需要手动配置或禁用 |
| **ISR 缓存** | 自动持久化 | 需要配置 R2 存储 |

---

## 适配步骤

### 第 1 步：安装适配器

```bash
pnpm add -D @opennextjs/cloudflare
```

**作用**：这是核心适配工具，负责转换 Next.js 构建产物。

---

### 第 2 步：配置 Cloudflare Workers

创建 `wrangler.toml`：

```toml
name = "pixel-ai-starter"
main = ".open-next/worker.js"                                    # OpenNext 生成的 Worker 入口
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]  # 启用 Node.js 兼容模式

assets = { directory = ".open-next/assets", binding = "ASSETS" } # 静态资源目录

[observability]
enabled = true
```

**为什么需要这个？**
- Vercel 自动识别项目类型，Cloudflare 需要明确告诉它这是什么类型的 Worker
- `nodejs_compat` 让 Workers 支持部分 Node.js API（Vercel 原生支持）
- 需要手动指定静态资源位置（Vercel 自动处理）

---

### 第 3 步：配置 OpenNext 适配器

创建 `open-next.config.ts`：

```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // 最简配置，使用默认转换规则
});
```

**为什么需要这个？**
- 告诉 OpenNext 如何转换你的 Next.js 应用
- 可以配置缓存策略、路由规则等（高级用法）

---

### 第 4 步：适配 Next.js 配置

修改 `next.config.ts`：

```typescript
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,  // ⚠️ 关键适配点 1：禁用 Vercel 的图片优化
  },
};

export default nextConfig;

// ⚠️ 关键适配点 2：本地开发时启用 Cloudflare 适配
initOpenNextCloudflareForDev();
```

**为什么需要修改？**

#### 适配点 1：图片优化
- **Vercel**：`next/image` 直接工作，自动优化
- **Cloudflare**：没有对应的图片优化 API
- **解决方案**：
  - 简单：`unoptimized: true`（直接使用原图）
  - 完整：配置 Cloudflare Images（付费服务）

#### 适配点 2：本地开发
- **Vercel**：`next dev` 就能模拟生产环境
- **Cloudflare**：需要适配器在本地模拟 Workers 环境
- **解决方案**：调用 `initOpenNextCloudflareForDev()`

---

### 第 5 步：修改构建和部署脚本

修改 `package.json`：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",

    "pages:build": "pnpm build && npx @opennextjs/cloudflare build",
    "preview": "npx @opennextjs/cloudflare preview",
    "deploy": "pnpm pages:build && npx @opennextjs/cloudflare deploy"
  }
}
```

**为什么需要修改？**

| 流程 | Vercel | Cloudflare (OpenNext) |
|------|--------|----------------------|
| **构建** | `next build` | `next build` + `@opennextjs/cloudflare build` |
| **预览** | `vercel dev` | `@opennextjs/cloudflare preview` |
| **部署** | `git push` | `@opennextjs/cloudflare deploy` |

OpenNext 需要一个额外的"转换"步骤：

```
next build → .next 目录 → OpenNext 转换 → .open-next/worker.js
```

---

### 第 6 步：本地开发环境配置

创建 `.dev.vars`：

```env
NEXTJS_ENV=development
```

**为什么需要这个？**
- Cloudflare Workers 的本地环境变量文件
- 等同于 Vercel 的 `.env.local`

---

### 第 7 步：忽略构建产物

更新 `.gitignore`：

```gitignore
# Vercel 构建产物
.next/
.vercel/

# Cloudflare 构建产物
.open-next/    # OpenNext 转换后的代码
.wrangler/     # Wrangler 本地缓存
.dev.vars      # 本地环境变量
```

---

## 关键差异对比

### 1. 运行时差异

```typescript
// ❌ 在 Cloudflare 不能用
export const runtime = 'edge';  // Vercel Edge Runtime

// ✅ 在 Cloudflare 用这个（或不写，默认）
export const runtime = 'nodejs'; // 或删除这行
```

**原因**：Vercel 的 Edge Runtime ≠ Cloudflare Workers Runtime

---

### 2. 图片优化差异

#### Vercel (开箱即用)

```tsx
import Image from 'next/image';

// 自动优化、自动生成多尺寸、自动 WebP
<Image src="/photo.jpg" width={800} height={600} />
```

#### Cloudflare (需要适配)

**方案 1：禁用优化（当前方案）**

```typescript
// next.config.ts
images: { unoptimized: true }
```

```tsx
// 图片直接使用，不优化
<Image src="/photo.jpg" width={800} height={600} />
```

**方案 2：使用 Cloudflare Images（需要付费）**

```typescript
// next.config.ts
images: {
  loader: 'custom',
  loaderFile: './image-loader.ts',
}
```

```typescript
// image-loader.ts
export default function cloudflareImageLoader({ src, width, quality }: any) {
  return `https://your-domain.com/cdn-cgi/image/width=${width},quality=${quality || 75}/${src}`;
}
```

---

### 3. ISR 缓存差异

#### Vercel (自动持久化)

```tsx
export const revalidate = 3600;

export default async function Page() {
  // Vercel 自动缓存这个页面 1 小时
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Cloudflare (需要配置 R2)

**不配置**：每次部署清空缓存
**配置 R2**：缓存持久化到 R2 存储桶

```typescript
// open-next.config.ts
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

```toml
# wrangler.toml
[[r2_buckets]]
binding = "NEXT_INC_CACHE_R2_BUCKET"
bucket_name = "my-isr-cache"
```

---

## 完整部署流程

### Vercel

```bash
git init
git add .
git commit -m "initial"
git push

# 完成！Vercel 自动识别、构建、部署
```

### Cloudflare (需要适配)

```bash
# 1. 构建 Next.js
pnpm build

# 2. 用 OpenNext 转换
npx @opennextjs/cloudflare build

# 3. 部署到 Cloudflare
npx @opennextjs/cloudflare deploy

# 或使用封装好的命令
pnpm deploy
```

---

## 适配成本总结

### 一次性配置（约 10 分钟）

- ✅ 安装适配器
- ✅ 创建 3 个配置文件 (wrangler.toml, open-next.config.ts, .dev.vars)
- ✅ 修改 next.config.ts
- ✅ 修改 package.json

### 运行时限制

| 功能 | Vercel | Cloudflare | 需要适配？ |
|------|--------|------------|-----------|
| App Router | ✅ | ✅ | ❌ |
| Server Components | ✅ | ✅ | ❌ |
| API Routes | ✅ | ✅ | ❌ |
| SSG/ISR | ✅ | ✅ | ⚠️ ISR 需配置 R2 |
| Edge Runtime | ✅ | ❌ | ✅ 用 nodejs runtime |
| 图片优化 | ✅ | ❌ | ✅ 禁用或用 CF Images |

---

## 成本对比

| 项目 | Vercel | Cloudflare |
|------|--------|------------|
| **免费额度** | 100GB 带宽/月 | 100,000 次请求/天 |
| **付费起步** | $20/月 | $5/月 |
| **图片优化** | 包含 | $5/月起 |
| **ISR 缓存** | 包含 | R2: $0.015/GB |

---

## 快速命令参考

```bash
# 本地开发（兼容 Cloudflare 环境）
pnpm dev

# 本地预览（模拟 Workers）
pnpm preview

# 构建
pnpm pages:build

# 部署
pnpm deploy
```

---

## 常见问题

### Q: 为什么不直接用 Vercel？
A: Cloudflare 更便宜，全球 CDN 节点更多（300+），免费额度更慷慨

### Q: 适配后性能有影响吗？
A: 没有。OpenNext 只是转换构建产物，运行时性能相同甚至更好（Cloudflare 边缘网络）

### Q: 所有 Next.js 功能都支持吗？
A: 95% 支持。主要限制：不支持 Vercel Edge Runtime，图片优化需要额外配置

### Q: 可以随时迁移回 Vercel 吗？
A: 可以。适配只是添加了几个配置文件，不影响原有代码

---

## 参考资源

- [OpenNext 官方文档](https://opennext.js.org/cloudflare) - 详细适配指南
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/) - 了解运行时环境
- [为什么需要 OpenNext？](https://github.com/opennextjs/opennextjs-cloudflare#why) - 技术原理

---

## 总结

**Vercel → Cloudflare 的本质**：

```
Vercel：Next.js 原生支持，零配置
   ↓
Cloudflare：通过 OpenNext 适配层，90% 功能支持 + 更低成本
```

**当前项目状态**：
- ✅ 适配完成，可以部署
- ✅ 本地开发环境配置完成
- ⚠️ 使用简化图片方案（unoptimized）
- 💡 生产环境建议：配置 R2 缓存 + Cloudflare Images
