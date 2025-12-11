import Link from 'next/link';
import { PixelCard, PixelButton, PixelBadge } from '@/components/ui/pixel';

// SSG: 静态生成，构建时生成
export default function SSGPage() {
  const buildTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  });

  return (
    <div className="min-h-screen p-8 section-max">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-pixel">SSG 测试页面</h1>
            <PixelBadge className="bg-[var(--px-black)] text-[var(--px-white)]">
              Static
            </PixelBadge>
          </div>
          <p className="opacity-70">Static Site Generation - 构建时生成</p>
        </header>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">⏰ 构建时间</h2>
          <div className="text-2xl font-mono">
            {buildTime}
          </div>
          <p className="text-sm opacity-70">
            这个时间是在构建时确定的，不会改变
          </p>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">📊 特点分析</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>最快的加载速度</strong>
                <p className="opacity-70">页面在构建时就生成好了，直接返回 HTML</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>完美的 CDN 缓存</strong>
                <p className="opacity-70">所有用户访问的都是同一个静态文件</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>SEO 友好</strong>
                <p className="opacity-70">爬虫直接获取完整 HTML</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-500">⚠️</span>
              <div>
                <strong>内容不会更新</strong>
                <p className="opacity-70">除非重新构建部署，否则内容永远不变</p>
              </div>
            </div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🧪 如何验证</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>记下当前显示的时间</li>
            <li>刷新页面多次</li>
            <li>时间<strong>不会改变</strong>（因为是静态的）</li>
            <li>重新构建并部署后，时间才会更新</li>
          </ol>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 bg-[var(--px-soft)]">
          <h2 className="text-xl font-pixel">💡 使用场景</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>博客文章页面</li>
            <li>产品展示页面</li>
            <li>关于我们 / FAQ 等静态页面</li>
            <li>文档页面</li>
          </ul>
        </PixelCard>

        <div className="flex gap-4">
          <Link href="/cache-test">
            <PixelButton variant="ghost">← 返回测试列表</PixelButton>
          </Link>
          <Link href="/cache-test/isr">
            <PixelButton>下一个：ISR →</PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
