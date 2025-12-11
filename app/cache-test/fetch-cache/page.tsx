import Link from 'next/link';
import { PixelCard, PixelButton, PixelBadge } from '@/components/ui/pixel';

// Fetch Cache: 演示数据层缓存
async function getCachedData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: {
      revalidate: 60, // 60 秒后重新验证
      tags: ['github-repo'], // 用于按需重新验证
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function getUncachedData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store', // 不缓存
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function FetchCachePage() {
  const [cachedData, uncachedData] = await Promise.all([
    getCachedData(),
    getUncachedData(),
  ]);

  const currentTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
  });

  return (
    <div className="min-h-screen p-8 section-max">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-pixel">Fetch Cache 测试</h1>
            <PixelBadge className="bg-[var(--px-soft)]">
              Data Layer
            </PixelBadge>
          </div>
          <p className="opacity-70">数据层缓存 - 缓存 fetch 请求结果</p>
        </header>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">⏰ 页面渲染时间</h2>
          <div className="text-2xl font-mono">
            {currentTime}
          </div>
        </PixelCard>

        {/* 缓存的数据 */}
        <PixelCard className="p-6 space-y-4 border-2 border-green-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-pixel">✅ 缓存的请求</h2>
            <PixelBadge className="bg-green-500 text-white">
              revalidate: 60s
            </PixelBadge>
          </div>

          {cachedData && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="opacity-70">Stars:</div>
                <div className="font-mono">{cachedData.stargazers_count?.toLocaleString()}</div>

                <div className="opacity-70">Forks:</div>
                <div className="font-mono">{cachedData.forks_count?.toLocaleString()}</div>

                <div className="opacity-70">Open Issues:</div>
                <div className="font-mono">{cachedData.open_issues_count?.toLocaleString()}</div>
              </div>
            </div>
          )}

          <p className="text-xs opacity-70 mt-4">
            💡 这些数据会缓存 60 秒，多次刷新页面不会重新请求 API
          </p>
        </PixelCard>

        {/* 不缓存的数据 */}
        <PixelCard className="p-6 space-y-4 border-2 border-red-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-pixel">❌ 不缓存的请求</h2>
            <PixelBadge className="bg-red-500 text-white">
              no-store
            </PixelBadge>
          </div>

          {uncachedData && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="opacity-70">Stars:</div>
                <div className="font-mono">{uncachedData.stargazers_count?.toLocaleString()}</div>

                <div className="opacity-70">Forks:</div>
                <div className="font-mono">{uncachedData.forks_count?.toLocaleString()}</div>

                <div className="opacity-70">Open Issues:</div>
                <div className="font-mono">{uncachedData.open_issues_count?.toLocaleString()}</div>
              </div>
            </div>
          )}

          <p className="text-xs opacity-70 mt-4">
            💡 每次刷新都会重新请求 API（数字可能会略有不同）
          </p>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">📊 Fetch Cache 配置</h2>
          <div className="space-y-4 text-sm font-mono bg-[var(--px-bg)] p-4 border border-[var(--px-outline)]">
            <div>
              <div className="opacity-50">// 缓存 60 秒</div>
              <div>fetch(url, {'{'} next: {'{'} revalidate: 60 {'}'} {'}'})</div>
            </div>

            <div className="border-t border-[var(--px-outline)] pt-4">
              <div className="opacity-50">// 永久缓存（默认）</div>
              <div>fetch(url, {'{'} cache: 'force-cache' {'}'})</div>
            </div>

            <div className="border-t border-[var(--px-outline)] pt-4">
              <div className="opacity-50">// 不缓存</div>
              <div>fetch(url, {'{'} cache: 'no-store' {'}'})</div>
            </div>

            <div className="border-t border-[var(--px-outline)] pt-4">
              <div className="opacity-50">// 按标签重新验证</div>
              <div>fetch(url, {'{'} next: {'{'} tags: ['posts'] {'}'} {'}'})</div>
              <div>revalidateTag('posts') // 手动触发</div>
            </div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🧪 如何验证</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>打开浏览器开发者工具的 Network 标签</li>
            <li><strong>刷新页面</strong></li>
            <li>观察 API 请求：
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>缓存的请求：可能不会出现在列表中（使用了缓存）</li>
                <li>不缓存的请求：每次都会发起新请求</li>
              </ul>
            </li>
            <li>等待 65 秒后再刷新，缓存的请求才会重新发起</li>
          </ol>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 border-2 border-yellow-500">
          <h2 className="text-xl font-pixel">⚠️ Cloudflare 注意事项</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>不配置 R2：</strong> fetch 缓存也会在部署时清空
            </p>
            <p>
              <strong>配置 R2：</strong> fetch 缓存会持久化到 R2 存储
            </p>
            <p className="text-xs opacity-70 mt-2">
              💡 建议生产环境配置 R2 以获得完整的缓存能力
            </p>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 bg-[var(--px-soft)]">
          <h2 className="text-xl font-pixel">💡 使用场景</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>第三方 API 数据（减少 API 调用次数）</li>
            <li>数据库查询结果缓存</li>
            <li>CMS 内容获取</li>
            <li>任何需要缓存的异步数据</li>
          </ul>
        </PixelCard>

        <div className="flex gap-4">
          <Link href="/cache-test/ssr">
            <PixelButton variant="ghost">← 上一个：SSR</PixelButton>
          </Link>
          <Link href="/cache-test">
            <PixelButton>返回测试列表</PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
