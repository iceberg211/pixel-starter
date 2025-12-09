import { PixelButton, PixelCard, PixelBadge, StatTile, PixelInput, PixelField, PixelDivider } from "@/components/ui/pixel";

export default function Home() {
    return (
        <div className="min-h-screen p-8 section-max space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h1 className="text-4xl md:text-6xl font-pixel mb-2">PIXEL_UI</h1>
                    <p className="text-xl font-mono opacity-70">Starter Kit v1.0.0</p>
                </div>
                <div className="flex gap-4">
                    <PixelButton variant="ghost">Docs</PixelButton>
                    <PixelButton>Get Started</PixelButton>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Section 1: Typography & Badges */}
                <PixelCard className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold font-pixel">Typography</h2>
                    <div className="space-y-4">
                        <p className="font-mono text-sm">Font family: "JetBrains Mono" (Mono)</p>
                        <p className="font-sans">Font family: "Inter" (Sans)</p>
                        <p className="font-pixel text-xs">Font family: "Press Start 2P" (Pixel)</p>
                    </div>

                    <PixelDivider />

                    <h2 className="text-2xl font-bold font-pixel">Badges</h2>
                    <div className="flex flex-wrap gap-2">
                        <PixelBadge className="bg-blue-200">New</PixelBadge>
                        <PixelBadge className="bg-red-200 text-red-900 animate-pulse">Live</PixelBadge>
                        <PixelBadge className="bg-neutral-200">Beta</PixelBadge>
                    </div>
                </PixelCard>

                {/* Section 2: Buttons */}
                <PixelCard className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold font-pixel">Buttons</h2>
                    <div className="flex flex-col gap-4">
                        <PixelButton>Primary Action</PixelButton>
                        <PixelButton variant="secondary">Secondary Action</PixelButton>
                        <PixelButton variant="ghost">Ghost Action</PixelButton>
                        <PixelButton disabled>Disabled</PixelButton>
                    </div>
                </PixelCard>

                {/* Section 3: Forms */}
                <PixelCard className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold font-pixel">Forms</h2>
                    <div className="space-y-4">
                        <PixelField label="Username" required>
                            <PixelInput placeholder="Enter username..." />
                        </PixelField>

                        <PixelField label="Email Address" hint="We will never share your email.">
                            <PixelInput type="email" placeholder="user@example.com" />
                        </PixelField>
                    </div>
                </PixelCard>

                {/* Section 4: Stats */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-2xl font-bold font-pixel mb-6">Stats & Metrics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <StatTile label="Total Users" value="12,345" hint="+12% from last week" />
                        <StatTile label="Revenue" value="$45.2k" hint="Gross volume" dark />
                        <StatTile label="Active Now" value="342" hint="Real-time" />
                        <StatTile label="Server Status" value={<span className="text-green-600">ONLINE</span>} />
                    </div>
                </div>

            </main>

            <footer className="mt-20 pt-8 border-t-2 border-dashed border-[var(--px-outline)] text-center font-mono text-sm opacity-60">
                <p>Built with Next.js 15 & Tailwind 4</p>
            </footer>
        </div>
    );
}
