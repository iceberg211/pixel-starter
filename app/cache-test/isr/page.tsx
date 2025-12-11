import Link from 'next/link';
import { PixelCard, PixelButton, PixelBadge } from '@/components/ui/pixel';

// ISR: 增量静态再生，每 30 秒重新验证
export const revalidate = 30; // 30 秒后重新生成

export default function ISRPage() {
  const currentTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
  });

  return (
    <div className="min-h-screen p-8 section-max">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-pixel">ISR 测试页面</h1>
            <PixelBadge className="bg-[var(--px-outline)] text-[var(--px-white)] animate-pixel-blink">
              Revalidate: 30s
            </PixelBadge>
          </div>
          <p className="opacity-70">Incremental Static Regeneration - 增量静态再生</p>
        </header>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">⏰ 当前时间</h2>
          <div className="text-2xl font-mono">
            {currentTime}
          </div>
          <p className="text-sm opacity-70">
            这个时间会在 30 秒后更新（当有新请求时）
          </p>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 border-2 border-yellow-500">
          <h2 className="text-xl font-pixel">⚠️ Cloudflare 特别说明</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>不配置 R2：</strong>
              <p className="opacity-70">每次部署后缓存清空，ISR 缓存不持久化</p>
            </div>
            <div>
              <strong>配置 R2：</strong>
              <p className="opacity-70">缓存存储在 R2 对象存储中，持久化保存</p>
            </div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">📊 特点分析</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>静态 + 动态的混合</strong>
                <p className="opacity-70">首次访问快速（静态），后台自动更新</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>自动更新内容</strong>
                <p className="opacity-70">无需重新部署，定期自动重新生成</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>降低服务器负载</strong>
                <p className="opacity-70">不是每次请求都生成，而是定期生成</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-500">⚠️</span>
              <div>
                <strong>Stale-While-Revalidate</strong>
                <p className="opacity-70">返回旧内容，同时在后台生成新内容</p>
              </div>
            </div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🧪 如何验证</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>记下当前显示的时间</li>
            <li><strong>立即刷新页面</strong> - 时间不会变（返回缓存）</li>
            <li><strong>等待 35 秒</strong></li>
            <li><strong>再次刷新</strong> - 时间应该更新了</li>
            <li>重复步骤 2-4，观察 30 秒的更新周期</li>
          </ol>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🔄 重新验证策略</h2>
          <div className="space-y-2 text-sm font-mono bg-[var(--px-bg)] p-4 border border-[var(--px-outline)]">
            <div>export const revalidate = 30; <span className="opacity-50">// 基于时间</span></div>
            <div className="opacity-50">// 或</div>
            <div>revalidateTag('posts'); <span className="opacity-50">// 按需重新验证</span></div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 bg-[var(--px-soft)]">
          <h2 className="text-xl font-pixel">💡 使用场景</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>博客文章列表（定期更新）</li>
            <li>产品目录（库存变化）</li>
            <li>新闻聚合页面</li>
            <li>实时统计数据（可以接受一定延迟）</li>
          </ul>
        </PixelCard>

        <div className="flex gap-4">
          <Link href="/cache-test/ssg">
            <PixelButton variant="ghost">← 上一个：SSG</PixelButton>
          </Link>
          <Link href="/cache-test/ssr">
            <PixelButton>下一个：SSR →</PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
