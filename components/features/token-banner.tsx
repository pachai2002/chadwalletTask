"use client";

import { useEffect, useState, useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

// ─── Token config ─────────────────────────────────────────────────────────────
const TOKENS = [
  { symbol: "SOL",    address: "So11111111111111111111111111111111111111112",    color: "#9945FF" },
  { symbol: "USDC",   address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", color: "#2775CA" },
  { symbol: "JUP",    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",  color: "#E8832A" },
  { symbol: "BONK",   address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", color: "#F7931A" },
  { symbol: "WIF",    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",  color: "#FF6B6B" },
  { symbol: "RAY",    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", color: "#00D2FF" },
  { symbol: "ORCA",   address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",  color: "#00E5BB" },
  { symbol: "PYTH",   address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3", color: "#E6DAFE" },
  { symbol: "MEME",   address: "MEmESSPBPizHMSBzHGH5oBY9bQgCHcMSR8TPo5cgPzb",  color: "#FFD700" },
  { symbol: "POPCAT", address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr", color: "#FF69B4" },
];

const MOCK_FALLBACKS: Record<string, { price: number; change24h: number }> = {
  "So11111111111111111111111111111111111111112": { price: 145.20, change24h: 4.72 }, // SOL
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { price: 1.00, change24h: 0.01 },  // USDC
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": { price: 1.12, change24h: -1.45 },  // JUP
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { price: 0.00002241, change24h: 12.35 }, // BONK
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { price: 2.34, change24h: -5.12 },  // WIF
  "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": { price: 3.42, change24h: 2.89 },  // RAY
  "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE": { price: 1.87, change24h: -0.56 },  // ORCA
  "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3": { price: 0.78, change24h: 1.23 },  // PYTH
  "MEmESSPBPizHMSBzHGH5oBY9bQgCHcMSR8TPo5cgPzb": { price: 0.0125, change24h: 18.72 }, // MEME
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": { price: 1.45, change24h: 9.61 },  // POPCAT
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface TokenData {
  symbol: string;
  address: string;
  color: string;
  price: number | null;
  change24h: number | null;
}

// ─── BirdEye fetch ────────────────────────────────────────────────────────────
async function fetchTokenPrices(): Promise<Record<string, { price: number; change24h: number }>> {
  try {
    const res = await fetch("/api/token-prices");
    if (!res.ok) {
      console.warn(`BirdEye proxy returned status ${res.status}. Using fallback data.`);
      return MOCK_FALLBACKS;
    }
    const json = await res.json();
    const data = json?.data ?? {};
    
    // If API returned empty data or failed, use mock fallback
    if (Object.keys(data).length === 0) {
      return MOCK_FALLBACKS;
    }

    const result: Record<string, { price: number; change24h: number }> = {};
    for (const [addr, item] of Object.entries(data)) {
      const d = item as { value?: number; priceChange24h?: number };
      result[addr] = {
        price: d.value ?? 0,
        change24h: d.priceChange24h ?? 0,
      };
    }
    return result;
  } catch (err) {
    console.error("Failed to fetch token prices from proxy, using mock fallbacks:", err);
    return MOCK_FALLBACKS;
  }
}

function formatPrice(price: number | null): string {
  if (price === null) return "—";
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

// ─── Single token 3D chip ──────────────────────────────────────────────────────
function Token3DChip({
  token,
  onClick,
  style,
}: {
  token: TokenData;
  onClick: (symbol: string) => void;
  style: React.CSSProperties;
}) {
  const isPositive = (token.change24h ?? 0) >= 0;
  return (
    <div
      style={style}
      className="carousel-3d-item"
    >
      <button
        onClick={() => onClick(token.symbol)}
        aria-label={`Trade ${token.symbol}`}
        className="w-full h-full flex items-center gap-2 px-3 py-1.5 rounded-2xl
          border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60
          hover:border-[#00FF88]/40 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]
          transition-all duration-300 cursor-pointer group select-none text-left"
      >
        {/* Token icon circle */}
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
          style={{
            backgroundColor: `${token.color}15`,
            color: token.color,
            border: `1px solid ${token.color}33`,
          }}
        >
          {token.symbol.slice(0, 2)}
        </span>

        <div className="flex flex-col min-w-0">
          {/* Symbol */}
          <span className="text-xs font-bold text-white/90 group-hover:text-[#00FF88] transition-colors leading-tight">
            {token.symbol}
          </span>
          {/* Price */}
          <span className="text-[10px] font-mono text-white/50 leading-none mt-0.5">
            {formatPrice(token.price)}
          </span>
        </div>

        {/* 24h change badge */}
        {token.change24h !== null && (
          <span
            className={`carousel-change-badge ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
              isPositive
                ? "bg-[#00FF88]/10 text-[#00FF88]"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}{token.change24h.toFixed(1)}%
          </span>
        )}
      </button>
    </div>
  );
}

// ─── Banner component ─────────────────────────────────────────────────────────
interface TokenBannerProps {
  direction?: "ltr" | "rtl";
  className?: string;
}

export function TokenBanner({ direction = "ltr", className = "" }: TokenBannerProps) {
  const { authenticated, login } = usePrivy();
  const router = useRouter();
  const [tokens, setTokens] = useState<TokenData[]>(
    TOKENS.map((t) => ({ ...t, price: null, change24h: null }))
  );

  // Fetch prices once on mount and every 30s
  const loadPrices = useCallback(async () => {
    const prices = await fetchTokenPrices();
    setTokens((prev) =>
      prev.map((t) => ({
        ...t,
        price: prices[t.address]?.price ?? t.price,
        change24h: prices[t.address]?.change24h ?? t.change24h,
      }))
    );
  }, []);

  useEffect(() => {
    loadPrices();
    const interval = setInterval(loadPrices, 30_000);
    return () => clearInterval(interval);
  }, [loadPrices]);

  const handleTokenClick = useCallback(
    (symbol: string) => {
      if (authenticated) {
        router.push(`/trade?token=${symbol}`);
      } else {
        // Set intent BEFORE calling login() to avoid race condition
        // (Privy can open the OAuth popup synchronously)
        sessionStorage.setItem("tradingToken", symbol);
        login();
      }
    },
    [authenticated, login, router]
  );

  const animClass = direction === "ltr" ? "ltr" : "rtl";

  return (
    <div className={`w-full py-4 relative select-none overflow-hidden ${className}`}>
      {/* Laser line behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent pointer-events-none blur-[1px] z-0" />

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/70 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/70 to-transparent z-20 pointer-events-none" />

      {/* 3D Carousel container */}
      <div className="carousel-3d-container">
        <div className={`carousel-3d-track ${animClass}`}>
          {tokens.map((token, i) => {
            const angle = (i * 360) / tokens.length;
            const style = {
              transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius))`,
              "--angle": `${angle}deg`,
            } as React.CSSProperties;

            return (
              <Token3DChip
                key={`${token.symbol}-${i}`}
                token={token}
                onClick={handleTokenClick}
                style={style}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
