import Link from 'next/link';
import { PixelCard, PixelButton } from '@/components/ui/pixel';

export default function CacheTestIndex() {
  return (
    <div className="min-h-screen p-8 section-max">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-pixel">缓存测试页面</h1>
          <p className="text-xl opacity-70">测试不同的渲染和缓存策略</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SSG 测试 */}
          <PixelCard className="p-6 space-y-4">
            <h2 className="text-2xl font-pixel">SSG 测试</h2>
            <p className="text-sm opacity-70">
              Static Site Generation
              <br />
              构建时生成，永久缓存
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 最快的加载速度</p>
              <p>✅ 构建时就确定内容</p>
              <p>⚠️ 内容不会改变</p>
            </div>
            <Link href="/cache-test/ssg">
              <PixelButton className="w-full">测试 SSG</PixelButton>
            </Link>
          </PixelCard>

          {/* ISR 测试 */}
          <PixelCard className="p-6 space-y-4">
            <h2 className="text-2xl font-pixel">ISR 测试</h2>
            <p className="text-sm opacity-70">
              Incremental Static Regeneration
              <br />
              定期重新生成（30秒）
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 快速加载</p>
              <p>✅ 内容定期更新</p>
              <p>⚠️ 需要 R2 持久化</p>
            </div>
            <Link href="/cache-test/isr">
              <PixelButton className="w-full">测试 ISR</PixelButton>
            </Link>
          </PixelCard>

          {/* SSR 测试 */}
          <PixelCard className="p-6 space-y-4">
            <h2 className="text-2xl font-pixel">SSR 测试</h2>
            <p className="text-sm opacity-70">
              Server-Side Rendering
              <br />
              每次请求都生成
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 实时数据</p>
              <p>⚠️ 每次都运行</p>
              <p>⚠️ 响应稍慢</p>
            </div>
            <Link href="/cache-test/ssr">
              <PixelButton className="w-full">测试 SSR</PixelButton>
            </Link>
          </PixelCard>

          {/* Fetch Cache 测试 */}
          <PixelCard className="p-6 space-y-4">
            <h2 className="text-2xl font-pixel">Fetch Cache</h2>
            <p className="text-sm opacity-70">
              数据层缓存
              <br />
              缓存 API 请求结果
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 减少 API 调用</p>
              <p>✅ 可设置过期时间</p>
              <p>✅ 可按标签重新验证</p>
            </div>
            <Link href="/cache-test/fetch-cache">
              <PixelButton className="w-full">测试 Fetch Cache</PixelButton>
            </Link>
          </PixelCard>
        </div>

        <PixelCard className="p-6 space-y-4 bg-[var(--px-soft)]">
          <h3 className="text-xl font-pixel">📝 测试说明</h3>
          <div className="space-y-2 text-sm">
            <p><strong>如何验证缓存：</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>查看页面上显示的时间戳</li>
              <li>刷新页面，观察时间是否变化</li>
              <li>等待一段时间后再刷新（ISR）</li>
              <li>检查构建产物 .open-next/ 目录</li>
            </ol>
          </div>
        </PixelCard>

        <div className="text-center">
          <Link href="/">
            <PixelButton variant="ghost">← 返回首页</PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
