"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  // Redirect to /trade after Privy is ready and user completed login from "Start Trading"
  useEffect(() => {
    if (ready && authenticated && sessionStorage.getItem("tradingToken")) {
      sessionStorage.removeItem("tradingToken");
      router.push("/trade");
    }
  }, [ready, authenticated, router]);

  function handleStartTrading() {
    if (authenticated) {
      router.push("/trade");
    } else {
      sessionStorage.setItem("tradingToken", "SOL");
      login();
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF88]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#00FF88]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-0">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-semibold mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                Now live on Solana
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Trade like a{" "}
                <span className="text-[#00FF88] glow-text">Chad</span>
                <br />
                on Solana
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0">
                The premier modern crypto wallet and trading platform.
                Lightning fast swaps, advanced charts, zero compromises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto font-bold glow-primary text-lg group"
                onClick={handleStartTrading}
              >
                Start Trading <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="#app" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-semibold text-lg">
                  Download App
                </Button>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {["#00FF88", "#00cc6a", "#00aa55", "#008844"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color, zIndex: 4 - i }}
                  >
                    {["C", "H", "A", "D"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-white font-semibold">50,000+</span> traders already on ChadWallet
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#00FF88] text-[#00FF88]" />)}
                  <span className="ml-1 text-[#00FF88] font-semibold">4.9</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-[#00FF88]/15 blur-[80px]" />
            </div>

            {/* Floating secondary phone (behind) */}
            <div
              className="absolute right-4 top-8 animate-float"
              style={{ animationDelay: "0.6s", animationDuration: "7s" }}
            >
              <div className="w-[180px] h-[370px] rounded-[36px] border-2 border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden shadow-2xl opacity-60">
                <Image
                  src="/chadwallet_assets/app store/discover.png"
                  alt="Discover screen"
                  width={180}
                  height={370}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Main phone (front) */}
            <div className="relative animate-float z-10" style={{ animationDelay: "0s" }}>
              <div className="w-[220px] h-[460px] rounded-[44px] border-2 border-[#00FF88]/40 bg-black shadow-[0_0_60px_rgba(0,255,136,0.2)] overflow-hidden relative">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-20 border border-white/10" />
                <Image
                  src="/chadwallet_assets/app store/portfolio.png"
                  alt="Portfolio screen"
                  width={220}
                  height={460}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute bottom-8 -left-4 glass rounded-2xl px-4 py-3 shadow-xl border border-[#00FF88]/20 animate-float"
              style={{ animationDelay: "1.2s", animationDuration: "5s" }}
            >
              <div className="text-xs text-gray-400">Portfolio Value</div>
              <div className="text-xl font-bold text-white">$42,069.00</div>
              <div className="text-xs text-[#00FF88] font-semibold">▲ +12.4% today</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
