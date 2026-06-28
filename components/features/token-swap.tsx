"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Settings2 } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export function TokenSwap() {
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const { login, authenticated } = usePrivy();

  const handleSwap = () => {
    // Placeholder for actual swap logic using Jupiter or BirdEye API
    console.log(`Swapping ${payAmount} SOL to ${receiveAmount} USDC`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl">Swap</CardTitle>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings2 className="w-5 h-5 text-gray-400" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        
        {/* You Pay */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5 hover:border-[#00FF88]/20 transition-colors">
          <label className="text-sm text-gray-400 font-medium">You Pay</label>
          <div className="flex items-center justify-between mt-2">
            <input
              type="number"
              placeholder="0.00"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="bg-transparent text-3xl font-bold outline-none w-full text-white placeholder-gray-700"
            />
            <div className="flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-full px-3 py-1.5 shrink-0">
              <span className="font-bold text-[#00FF88]">SOL</span>
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center relative z-10">
          <Button variant="glass" size="icon" className="rounded-full h-10 w-10 border-[#00FF88]/20 hover:border-[#00FF88]/50">
            <ArrowDownUp className="w-4 h-4 text-[#00FF88]" />
          </Button>
        </div>

        {/* You Receive */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5 hover:border-[#00FF88]/20 transition-colors">
          <label className="text-sm text-gray-400 font-medium">You Receive</label>
          <div className="flex items-center justify-between mt-2">
            <input
              type="number"
              placeholder="0.00"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="bg-transparent text-3xl font-bold outline-none w-full text-white placeholder-gray-700"
            />
            <div className="flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-full px-3 py-1.5 shrink-0">
              <span className="font-bold text-[#00FF88]">USDC</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={authenticated ? handleSwap : login}
          className="w-full mt-2 h-12 text-lg font-bold glow-primary"
        >
          {authenticated ? "Swap Tokens" : "Connect Wallet"}
        </Button>

      </CardContent>
    </Card>
  );
}
