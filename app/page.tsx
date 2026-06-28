import { Hero } from "@/components/sections/hero";
import { TokenBanner } from "@/components/features/token-banner";
import { AppShowcase } from "@/components/sections/app-showcase";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Zap, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Top rotating token banner ── */}
      <TokenBanner direction="ltr" />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Features ── */}
      <section id="features" className="py-28 container mx-auto px-4 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-semibold mb-6">
            ⚡ Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Why Choose ChadWallet?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Built for performance, security, and the ultimate trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <Card className="hover:border-[#00FF88]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF88]/15 transition-colors">
                <Zap className="w-7 h-7 text-[#00FF88]" />
              </div>
              <CardTitle className="text-xl">Lightning Fast</CardTitle>
              <CardDescription className="text-base mt-2">
                Execute trades in milliseconds. Our optimized infrastructure ensures you never miss a market move.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-[#00FF88]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF88]/15 transition-colors">
                <Shield className="w-7 h-7 text-[#00FF88]" />
              </div>
              <CardTitle className="text-xl">Bank-Grade Security</CardTitle>
              <CardDescription className="text-base mt-2">
                Your assets are protected with industry-leading encryption and non-custodial architecture.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-[#00FF88]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mb-4 group-hover:bg-[#00FF88]/15 transition-colors">
                <TrendingUp className="w-7 h-7 text-[#00FF88]" />
              </div>
              <CardTitle className="text-xl">Advanced Tools</CardTitle>
              <CardDescription className="text-base mt-2">
                Integrated TradingView charts and BirdEye data give you the edge you need to dominate the market.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* ── App Screenshots ── */}
      <AppShowcase />

      {/* ── Bottom rotating token banner (reverse direction) ── */}
      <TokenBanner direction="rtl" className="mt-8" />

    </div>
  );
}
