"use client";

import { PrivyProvider } from "@privy-io/react-auth";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!PRIVY_APP_ID || PRIVY_APP_ID.trim() === "") {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["google", "apple"],
        appearance: {
          theme: "dark",
          accentColor: "#00FF88",
          logo: "/chadwallet_assets/logo/dark.png",
        },
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
          ethereum: {
            createOnLogin: "off",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
