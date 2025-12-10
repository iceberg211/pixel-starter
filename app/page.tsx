"use client";

import { PixelButton, PixelCard, PixelBadge, StatTile, PixelInput, PixelField, PixelDivider, PixelProgressBar, EnergyBar, StatusIndicator, PixelTerminal, PixelToast, PixelToggle, PixelTabs, PixelSpinner } from "@/components/ui/pixel";
import { useState, useEffect } from "react";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

        setIsDarkMode(shouldBeDark);
        document.documentElement.setAttribute("data-theme", shouldBeDark ? "dark" : "light");
    }, []);

    // Handle theme toggle
    const toggleTheme = (checked: boolean) => {
        setIsDarkMode(checked);
        const theme = checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <div className="min-h-screen p-8 section-max space-y-8 scanlines">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h1 className="text-4xl md:text-6xl font-pixel mb-2">PIXEL_UI</h1>
                    <p className="text-xl opacity-70">Starter Kit v1.0.0 <span className="animate-pixel-blink">_</span></p>
                </div>
                <div className="flex items-center gap-4">
                    <PixelToggle
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        label={isDarkMode ? "🌙 Dark" : "☀️ Light"}
                    />
                    <PixelButton variant="ghost">Docs</PixelButton>
                    <PixelButton>Get Started</PixelButton>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Section 1: Typography & Badges */}
                <PixelCard className="p-6 space-y-6 animate-slide-in">
                    <h2 className="text-2xl font-bold font-pixel">Typography</h2>
                    <div className="space-y-4">
                        <p className="text-sm">Font: Inter (Body text - readable)</p>
                        <p className="font-mono text-sm">Font: JetBrains Mono (Code)</p>
                        <p className="font-pixel text-xs">Press Start 2P (Headings)</p>
                    </div>

                    <PixelDivider />

                    <h2 className="text-2xl font-bold font-pixel">Badges</h2>
                    <div className="flex flex-wrap gap-2">
                        <PixelBadge className="bg-[var(--px-black)] text-[var(--px-white)] animate-pixel-pulse">New</PixelBadge>
                        <PixelBadge className="bg-[var(--px-outline)] text-[var(--px-white)] animate-pixel-blink">Live</PixelBadge>
                        <PixelBadge className="bg-[var(--px-soft)]">Beta</PixelBadge>
                    </div>
                </PixelCard>

                {/* Section 2: Buttons */}
                <PixelCard className="p-6 space-y-6 pixel-border-dotted">
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
                        <StatTile label="Server Status" value={<span className="font-bold">ONLINE</span>} />
                    </div>
                </div>

                {/* Section 5: Pixel Effects Demo */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-2xl font-bold font-pixel mb-6">Pixel Effects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <PixelCard className="p-6 space-y-4">
                            <h3 className="text-lg font-bold font-pixel">Scanlines</h3>
                            <div className="scanlines h-24 bg-[var(--px-soft)] p-4 border-2 border-[var(--px-outline)]">
                                <p className="text-sm">CRT screen effect</p>
                            </div>
                        </PixelCard>

                        <PixelCard className="p-6 space-y-4 pixel-border-dotted">
                            <h3 className="text-lg font-bold font-pixel">Dotted Border</h3>
                            <p className="text-sm">8-bit style decoration</p>
                        </PixelCard>

                        <PixelCard className="p-6 space-y-4">
                            <h3 className="text-lg font-bold font-pixel">Loading</h3>
                            <div className="pixel-loading text-2xl font-bold">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        </PixelCard>
                    </div>
                </div>

                {/* Section 6: UI Components */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-2xl font-bold font-pixel mb-6">UI Components</h2>

                    {/* Progress Bars */}
                    <PixelCard className="p-6 space-y-6 mb-4">
                        <h3 className="text-xl font-bold font-pixel">Progress Bars</h3>
                        <PixelProgressBar value={75} label="Download Progress" />
                        <PixelProgressBar value={45} label="Installation" />
                        <PixelProgressBar value={90} label="Upload Complete" />
                    </PixelCard>

                    {/* Energy Bars */}
                    <PixelCard className="p-6 space-y-4 mb-4">
                        <h3 className="text-xl font-bold font-pixel">Status Bars</h3>
                        <EnergyBar current={850} max={1000} type="health" label="Primary" />
                        <EnergyBar current={320} max={500} type="mana" label="Secondary" />
                        <EnergyBar current={75} max={100} type="energy" label="Tertiary" />
                    </PixelCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Status Indicators */}
                        <PixelCard className="p-6 space-y-4">
                            <h3 className="text-xl font-bold font-pixel">Status</h3>
                            <StatusIndicator status="online" label="在线" />
                            <StatusIndicator status="away" label="离开" />
                            <StatusIndicator status="busy" label="忙碌" />
                            <StatusIndicator status="offline" label="离线" pulse={false} />
                        </PixelCard>

                        {/* Spinner */}
                        <PixelCard className="p-6 space-y-4">
                            <h3 className="text-xl font-bold font-pixel">Loading</h3>
                            <div className="flex items-center gap-4">
                                <PixelSpinner size="sm" />
                                <PixelSpinner size="md" />
                                <PixelSpinner size="lg" />
                            </div>
                            <p className="text-sm opacity-70">Different spinner sizes</p>
                        </PixelCard>
                    </div>

                    {/* Terminal */}
                    <PixelCard className="p-6 mb-4">
                        <h3 className="text-xl font-bold font-pixel mb-4">Terminal</h3>
                        <PixelTerminal
                            lines={[
                                "Initializing system...",
                                "Loading modules... OK",
                                "Connecting to server... OK",
                                "System ready!",
                            ]}
                            prompt="$"
                        />
                    </PixelCard>

                    {/* Notifications */}
                    <div className="space-y-3 mb-4">
                        <h3 className="text-xl font-bold font-pixel">Notifications</h3>
                        <PixelToast message="Info: This is an information message" type="info" />
                        <PixelToast message="Success: Operation completed!" type="success" />
                        <PixelToast message="Warning: Please check your settings" type="warning" />
                        <PixelToast message="Error: Something went wrong" type="error" />
                    </div>

                    {/* Tabs */}
                    <PixelCard className="p-6">
                        <h3 className="text-xl font-bold font-pixel mb-4">Tabs</h3>
                        <PixelTabs
                            tabs={[
                                {
                                    id: "tab1",
                                    label: "Overview",
                                    content: <div className="p-4">This is the overview tab content. Build amazing pixel UIs!</div>,
                                },
                                {
                                    id: "tab2",
                                    label: "Settings",
                                    content: <div className="p-4">Settings tab content goes here. Configure your preferences.</div>,
                                },
                                {
                                    id: "tab3",
                                    label: "Profile",
                                    content: <div className="p-4">Profile information and statistics.</div>,
                                },
                            ]}
                        />
                    </PixelCard>
                </div>

            </main>

            <footer className="mt-20 pt-8 border-t-2 border-dashed border-[var(--px-outline)] text-center text-sm opacity-60">
                <p>Built with Next.js 15 & Tailwind 4 <span className="font-pixel text-xs">█</span></p>
            </footer>
        </div>
    );
}
