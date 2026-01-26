import Link from "next/link"
import { ArrowRight, Briefcase, Users, CheckCircle2, LineChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BentoGrid() {
    return (
        <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">

                    {/* Large Main Block */}
                    <div className="relative flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-100 p-8 lg:col-span-2 lg:p-12 border overflow-hidden group">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-transform group-hover:scale-110 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                    Who We Are
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Shaping the Future of Business
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-slate-600 max-w-2xl">
                                The Asian Business Collective is Binghamton University's premier organization for students driven to excel. We bridge the gap between classroom theory and real-world success through rigorous professional development and a strong support network.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <span>Mentorship</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <span>Career Development</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <span>Networking</span>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Button asChild className="rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                                    <Link href="/about">
                                        Read Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stacked Side Blocks */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        {/* Professional Growth Card */}
                        <div className="group relative overflow-hidden rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-blue-50 transition-transform group-hover:scale-150 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <LineChart className="h-6 w-6" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-slate-900">Professional Growth</h3>
                                <p className="mt-2 text-slate-600">
                                    Master technical skills through our case competitions, workshops, and exclusive industry panels.
                                </p>
                            </div>
                        </div>

                        {/* Community Card */}
                        <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 transition-transform group-hover:scale-150 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                                    <Users className="h-6 w-6" />
                                </div>
                                <h3 className="font-serif text-xl font-bold">Community</h3>
                                <p className="mt-2 text-slate-300">
                                    Join a lifelong network of ambitious peers, alumni, and mentors who champion your success.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
