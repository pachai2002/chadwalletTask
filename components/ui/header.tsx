"use client";

import Link from "next/link";
import Image from "next/image";
import { usePrivy, type WalletWithMetadata } from "@privy-io/react-auth";
import { Button } from "./button";
import { LogOut, Wallet } from "lucide-react";

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export function Header() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Narrow to WalletWithMetadata accounts only, then find Solana wallet
  const wallets = (user?.linkedAccounts ?? []).filter(
    (a): a is WalletWithMetadata => a.type === "wallet"
  );
  const walletAddress =
    wallets.find((w) => (w as WalletWithMetadata & { chainType?: string }).chainType === "solana")?.address ??
    wallets[0]?.address;

  return (
    <header className="fixed top-0 w-full z-50 border-b border-[#00FF88]/10 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-xl overflow-hidden bg-black border border-[#00FF88]/20">
              <Image
                src="/chadwallet_assets/logo/dark.png"
                alt="ChadWallet Logo"
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
              ChadWallet
            </span>
          </Link>
        </div>

        {/* Nav — Features + App only (Trade removed) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="#features" className="hover:text-[#00FF88] transition-colors">
            Features
          </Link>
          <Link href="#app" className="hover:text-[#00FF88] transition-colors">
            App
          </Link>
        </nav>

        {/* Auth button */}
        <div className="flex items-center gap-3">
          {!ready ? (
            <Button variant="default" className="font-semibold glow-primary-sm opacity-50" disabled>
              Loading…
            </Button>
          ) : authenticated && walletAddress ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 text-sm font-mono text-[#00FF88]">
                <Wallet className="w-3.5 h-3.5" />
                {shortenAddress(walletAddress)}
              </div>
              <button
                onClick={() => logout()}
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all text-gray-400 hover:text-red-400"
                aria-label="Disconnect wallet"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              onClick={() => login()}
              variant="default"
              className="font-semibold glow-primary-sm"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
