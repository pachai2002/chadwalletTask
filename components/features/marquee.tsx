"use client";

import React from "react";

const assets = [
  "SOL", "USDC", "JUP", "BONK", "WIF", "RAY", "ORCA", "PYTH", "MEME", "POPCAT",
  "SOL", "USDC", "JUP", "BONK", "WIF", "RAY", "ORCA", "PYTH", "MEME", "POPCAT",
];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden py-8 bg-black/50 border-y border-[#00FF88]/10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {assets.map((asset, index) => (
          <div
            key={index}
            className="flex-none mx-8 md:mx-14 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FF88]/50" />
            <span className="text-xl md:text-3xl font-bold text-white/25 uppercase tracking-widest hover:text-[#00FF88]/60 transition-colors">
              {asset}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
