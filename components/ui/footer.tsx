import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-[#00FF88]/10 bg-black/60 backdrop-blur-sm mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 relative rounded-xl overflow-hidden bg-black border border-[#00FF88]/20">
                <Image
                  src="/chadwallet_assets/logo/dark.png"
                  alt="ChadWallet Logo"
                  fill
                  sizes="36px"
                  className="object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-bold tracking-tight">ChadWallet</h3>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              The premier modern crypto wallet and trading platform built on Solana.
              Trade fast, securely, and like a Chad.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/trade" className="hover:text-[#00FF88] transition-colors">Trade</Link></li>
              <li><Link href="#" className="hover:text-[#00FF88] transition-colors">Staking</Link></li>
              <li><Link href="#app" className="hover:text-[#00FF88] transition-colors">Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-[#00FF88] transition-colors">Docs</Link></li>
              <li><Link href="#" className="hover:text-[#00FF88] transition-colors">Support</Link></li>
              <li><Link href="#" className="hover:text-[#00FF88] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#00FF88]/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ChadWallet. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#00FF88] transition-colors">Twitter / X</Link>
            <Link href="#" className="hover:text-[#00FF88] transition-colors">Discord</Link>
            <Link href="#" className="hover:text-[#00FF88] transition-colors">Telegram</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
