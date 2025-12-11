import Link from 'next/link';
import { PixelCard, PixelButton, PixelBadge } from '@/components/ui/pixel';

// SSR: 服务端渲染，每次请求都生成
export const dynamic = 'force-dynamic'; // 强制动态渲染

export default function SSRPage() {
  const currentTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
  });

  const requestId = Math.random().toString(36).substring(7);

  return (
    <div className="min-h-screen p-8 section-max">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-pixel">SSR 测试页面</h1>
            <PixelBadge className="bg-[var(--px-outline)] text-[var(--px-white)] animate-pixel-pulse">
              Dynamic
            </PixelBadge>
          </div>
          <p className="opacity-70">Server-Side Rendering - 服务端渲染</p>
        </header>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">⏰ 渲染时间</h2>
          <div className="text-2xl font-mono">
            {currentTime}
          </div>
          <p className="text-sm opacity-70">
            这个时间会在每次刷新时更新
          </p>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🔑 请求 ID</h2>
          <div className="text-lg font-mono text-[var(--px-primary)]">
            {requestId}
          </div>
          <p className="text-sm opacity-70">
            每次请求都会生成新的 ID（证明是实时渲染）
          </p>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">📊 特点分析</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>实时数据</strong>
                <p className="opacity-70">每次请求都获取最新数据</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>适合个性化内容</strong>
                <p className="opacity-70">可以根据用户、session 等返回不同内容</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <div>
                <strong>SEO 友好</strong>
                <p className="opacity-70">仍然返回完整 HTML 给爬虫</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">⚠️</span>
              <div>
                <strong>响应时间较慢</strong>
                <p className="opacity-70">需要等待服务器渲染完成</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">⚠️</span>
              <div>
                <strong>服务器负载高</strong>
                <p className="opacity-70">每次请求都要运行 React 渲染</p>
              </div>
            </div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">🧪 如何验证</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>记下当前的时间和请求 ID</li>
            <li><strong>刷新页面</strong></li>
            <li>时间和 ID <strong>都会改变</strong>（每次都重新渲染）</li>
            <li>打开浏览器开发者工具 Network 标签</li>
            <li>查看响应头，没有缓存相关的 header</li>
          </ol>
        </PixelCard>

        <PixelCard className="p-6 space-y-4">
          <h2 className="text-xl font-pixel">⚙️ 配置方式</h2>
          <div className="space-y-2 text-sm font-mono bg-[var(--px-bg)] p-4 border border-[var(--px-outline)]">
            <div className="opacity-50">// 方式 1: 使用 dynamic 配置</div>
            <div>export const dynamic = 'force-dynamic';</div>
            <div className="mt-2 opacity-50">// 方式 2: 使用动态函数</div>
            <div>const headers = headers(); // 使用 headers()</div>
            <div>const params = useSearchParams(); // 或其他动态函数</div>
          </div>
        </PixelCard>

        <PixelCard className="p-6 space-y-4 bg-[var(--px-soft)]">
          <h2 className="text-xl font-pixel">💡 使用场景</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>用户仪表板（个性化内容）</li>
            <li>实时数据展示（股票、天气）</li>
            <li>基于 Cookie/Session 的页面</li>
            <li>搜索结果页面</li>
            <li>需要实时验证权限的页面</li>
          </ul>
        </PixelCard>

        <div className="flex gap-4">
          <Link href="/cache-test/isr">
            <PixelButton variant="ghost">← 上一个：ISR</PixelButton>
          </Link>
          <Link href="/cache-test/fetch-cache">
            <PixelButton>下一个：Fetch Cache →</PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
