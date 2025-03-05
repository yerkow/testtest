import { Button } from '@/components/ui/button'
import { Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    <span className="text-xl font-bold">Uptime Monitor</span>
                </div>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
                        Dashboard
                    </Link>
                    <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
                        Pricing
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Monitor Your Services 24/7
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Get instant notifications when your websites or services go down. Track uptime,
                                        response time, and performance with our powerful monitoring solution.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/dashboard">
                                        <Button size="lg" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                    <Link href="#features">
                                        <Button size="lg" variant="outline" className="w-full">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    alt="Dashboard Preview"
                                    className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                    height="310"
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                    width="550"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our uptime monitoring solution provides all the tools you need to ensure your
                                    services are always available.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Uptime Monitoring</h3>
                                <p className="text-center text-muted-foreground">
                                    Monitor your websites and services with customizable check intervals.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Bell className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Instant Alerts</h3>
                                <p className="text-center text-muted-foreground">
                                    Get notified immediately when your services go down via email, Slack, or webhooks.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Detailed Analytics</h3>
                                <p className="text-center text-muted-foreground">
                                    Track response times, uptime percentage, and historical performance.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Server className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Status Page</h3>
                                <p className="text-center text-muted-foreground">
                                    Create a public status page to keep your users informed about service status.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Settings className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Customizable Checks</h3>
                                <p className="text-center text-muted-foreground">
                                    HTTP, ping, TCP port, and keyword monitoring with custom parameters.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Global Monitoring</h3>
                                <p className="text-center text-muted-foreground">
                                    Check your services from multiple locations around the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Simple, Transparent Pricing
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Choose the plan that's right for you and start monitoring your services today.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
                            <div className="flex flex-col rounded-lg border bg-card p-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Free</h3>
                                    <p className="text-muted-foreground">
                                        Perfect for personal projects and small websites.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-baseline text-3xl font-bold">
                                    $0
                                    <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>5 monitors</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>5-minute check interval</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Email notifications</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>24-hour history</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <Button className="w-full">Get Started</Button>
                                </div>
                            </div>
                            <div className="flex flex-col rounded-lg border bg-card p-6 shadow-lg">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Pro</h3>
                                    <p className="text-muted-foreground">
                                        For businesses with multiple services to monitor.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-baseline text-3xl font-bold">
                                    $29
                                    <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>50 monitors</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>1-minute check interval</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Email, Slack, Discord notifications</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>30-day history</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Custom status page</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <Button className="w-full">Get Started</Button>
                                </div>
                            </div>
                            <div className="flex flex-col rounded-lg border bg-card p-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Enterprise</h3>
                                    <p className="text-muted-foreground">
                                        For large organizations with advanced needs.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-baseline text-3xl font-bold">
                                    $99
                                    <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Unlimited monitors</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>30-second check interval</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>All notification channels</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>1-year history</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Priority support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Custom integrations</span>
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <Button className="w-full">Contact Sales</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
                <p className="text-xs text-muted-foreground">© 2025 Uptime Monitor. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function BarChart3(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    )
}

function Bell(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}

function Globe(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}

function Server(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
    )
}

function Settings(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function ActivityIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
