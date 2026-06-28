"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePrivy, type WalletWithMetadata } from "@privy-io/react-auth";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./button";
import { LogOut, Wallet, X, AlertTriangle, ChevronLeft } from "lucide-react";

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

function LogoutModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl p-8 flex flex-col items-center text-center"
        style={{ boxShadow: "0 0 60px rgba(0,255,136,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Sign Out?</h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          You&apos;ll be disconnected from your wallet. Any pending trades will
          not be affected.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 text-sm font-semibold text-red-400 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin" />
                Signing out…
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const isTrading = pathname === "/trade";
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Narrow to WalletWithMetadata accounts only, then find Solana wallet
  const wallets = (user?.linkedAccounts ?? []).filter(
    (a): a is WalletWithMetadata => a.type === "wallet"
  );
  const walletAddress =
    wallets.find(
      (w) =>
        (w as WalletWithMetadata & { chainType?: string }).chainType === "solana"
    )?.address ?? wallets[0]?.address;

  async function handleLogoutConfirm() {
    setLoggingOut(true);
    try {
      // Clear any pending navigation intent before logout
      sessionStorage.removeItem("tradingToken");
      await logout();
      setShowLogoutModal(false);
      // CRITICAL: Use hard page reload instead of client-side navigation.
      // router.push() keeps the React tree alive, leaving Privy's SDK with stale
      // OAuth nonces/PKCE verifiers in memory → causes "fails on second login".
      // A full reload completely re-initializes the Privy SDK from scratch.
      window.location.href = "/";
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <>
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

          {/* Nav — hidden on trading page */}
          {isTrading ? (
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/30 text-sm font-semibold text-gray-400 hover:text-[#00FF88] transition-all group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </button>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link href="#features" className="hover:text-[#00FF88] transition-colors">
                Features
              </Link>
              <Link href="#app" className="hover:text-[#00FF88] transition-colors">
                App
              </Link>
            </nav>
          )}

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
                  onClick={() => setShowLogoutModal(true)}
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

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => !loggingOut && setShowLogoutModal(false)}
          loading={loggingOut}
        />
      )}
    </>
  );
}
