"use client";

import { useEffect, Suspense } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { TradingViewWidget } from "@/components/features/trading-view";
import { TokenSwap } from "@/components/features/token-swap";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

function TradeContent() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenSymbol = searchParams.get("token") ?? "SOL";

  // After login redirect: check sessionStorage for intended token
  useEffect(() => {
    if (authenticated) {
      const intended = sessionStorage.getItem("tradingToken");
      if (intended) {
        sessionStorage.removeItem("tradingToken");
        // If current token param doesn't match, update URL silently
        if (intended !== tokenSymbol) {
          router.replace(`/trade?token=${intended}`);
        }
      }
    }
  }, [authenticated, tokenSymbol, router]);

  // Loading state
  if (!ready) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
      </div>
    );
  }

  // Auth guard — show sign-in prompt
  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-9 h-9 text-[#00FF88]" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Sign in to Trade</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Connect with Apple, Google, or your Solana wallet to start trading on ChadWallet.
          </p>
          <Button
            size="lg"
            className="font-bold glow-primary text-lg w-full sm:w-auto"
            onClick={() => login()}
          >
            Sign In to Trade
          </Button>
        </div>
      </div>
    );
  }

  // Authenticated — show trading UI
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col">
      {/* Mobile: chart on top, swap below — both scrollable */}
      <div className="flex flex-col lg:flex-row flex-1 gap-0 lg:gap-6 px-4 py-4 lg:py-8 lg:container lg:mx-auto">

        {/* Chart Section — full width on mobile, flex-1 on desktop */}
        <div className="w-full lg:flex-1 h-[360px] sm:h-[420px] lg:h-[calc(100vh-112px)] order-1">
          <TradingViewWidget />
        </div>

        {/* Swap + Stats Section */}
        <div className="w-full lg:w-[380px] shrink-0 order-2 flex flex-col gap-4 mt-4 lg:mt-0 lg:h-[calc(100vh-112px)] lg:overflow-y-auto">
          {/* Active token indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-[#00FF88] font-semibold">Trading: {tokenSymbol}</span>
          </div>

          <TokenSwap />

          {/* Market Stats */}
          <div className="bg-black/40 rounded-2xl p-6 border border-[#00FF88]/10 glass">
            <h3 className="text-lg font-semibold mb-4 text-white/90">Market Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Volume</span>
                <span className="font-semibold text-white">$1.2B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h High</span>
                <span className="font-semibold text-[#00FF88]">$145.20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Low</span>
                <span className="font-semibold text-red-400">$132.80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Change</span>
                <span className="font-semibold text-[#00FF88]">+4.72%</span>
              </div>
            </div>
          </div>

          {/* Bottom padding on mobile so last card isn't flush to edge */}
          <div className="h-4 lg:hidden" />
        </div>
      </div>
    </div>
  );
}

export default function TradePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
        </div>
      }
    >
      <TradeContent />
    </Suspense>
  );
}

