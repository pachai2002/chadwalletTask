"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  { src: "/chadwallet_assets/app store/portfolio.png", label: "Portfolio" },
  { src: "/chadwallet_assets/app store/token.png", label: "Token Detail" },
  { src: "/chadwallet_assets/app store/discover.png", label: "Discover" },
  { src: "/chadwallet_assets/app store/search.png", label: "Search" },
  { src: "/chadwallet_assets/app store/launch.png", label: "Launch" },
];

export function AppShowcase() {
  return (
    <section id="app" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00FF88]/6 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-semibold mb-6">
            📱 Mobile App
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Trade on the <span className="text-[#00FF88] glow-text">Go</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            The full power of ChadWallet in your pocket. Available on iOS and Android.
          </p>
        </motion.div>

        {/* Screenshot carousel */}
        <div className="flex items-end justify-center gap-5 md:gap-8 overflow-x-auto pb-6 px-4">
          {screenshots.map((shot, i) => {
            const isCenter = i === 2;
            const sizes = isCenter
              ? { w: 220, h: 460 }
              : { w: 175, h: 370 };

            return (
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative shrink-0 flex flex-col items-center gap-3 animate-float`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {/* Phone frame */}
                <div
                  className={`relative rounded-[36px] overflow-hidden border transition-all duration-300 shadow-2xl
                    ${isCenter
                      ? "border-[#00FF88]/50 shadow-[0_0_50px_rgba(0,255,136,0.25)] scale-110"
                      : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/20"
                    }`}
                  style={{ width: sizes.w, height: sizes.h }}
                >
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20 border border-white/10" />
                  
                  {/* Screenshot */}
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    width={sizes.w}
                    height={sizes.h}
                    className="w-full h-full object-cover object-top"
                    sizes="220px"
                  />

                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[36px]" />
                </div>

                {/* Label */}
                <span className={`text-sm font-medium transition-colors ${isCenter ? "text-[#00FF88]" : "text-gray-500"}`}>
                  {shot.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* App store badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/60 transition-all group"
          >
            <svg className="w-7 h-7 text-white group-hover:text-[#00FF88] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <div className="text-xs text-gray-400">Download on the</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/5 hover:bg-[#00FF88]/10 hover:border-[#00FF88]/60 transition-all group"
          >
            <svg className="w-7 h-7 text-white group-hover:text-[#00FF88] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.22.99.14l12.12-6.99-2.54-2.54-10.57 9.39zM.54 1.38C.2 1.71 0 2.22 0 2.88v18.24c0 .66.2 1.17.54 1.5l.08.07 10.21-10.21v-.24L.62 1.31l-.08.07zM20.46 9.68l-2.91-1.68-2.84 2.84 2.84 2.84 2.93-1.69c.83-.48.83-1.26-.02-1.31zM3.18.24L15.76 7.2l-2.54 2.54L3.18.32c.01-.02.01-.05 0-.08z"/>
            </svg>
            <div>
              <div className="text-xs text-gray-400">Get it on</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
