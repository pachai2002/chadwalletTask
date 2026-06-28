# Modern Crypto Trading Website for ChadWallet

Build a premium, modern crypto trading website with a dark futuristic theme, using Next.js 16, React 19, TailwindCSS v4, shadcn/ui, Framer Motion, Privy Authentication, BirdEye API, and TradingView Widget. The website should have high-quality aesthetics similar to fomo.family, linear, and vercel.

## User Review Required

- > [!IMPORTANT]
  > Please review the planned dependencies (e.g., shadcn/ui components, lucide-react, framer-motion, @privy-io/react-auth). I will install these via npm.
- > [!WARNING]
  > The ChadWallet logo is black and white. I will choose a suitable vibrant accent color (like a glowing neon blue or purple) to contrast with the dark theme, unless you prefer a specific accent color.

## Open Questions

- Do you have an API key for BirdEye API and TradingView Widget, or should I use public/demo endpoints for now?
- Are there specific crypto pairs (e.g., SOL/USDC) that should be featured on the trading page?
- Do you have a preferred Privy App ID, or should we use a demo/placeholder one for the setup?

## Proposed Changes

We will restructure the project and build reusable components under the 250-line limit as requested.

### Setup and Dependencies
- Install `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` for UI interactions and styling.
- Install shadcn/ui base components.
- Install `@privy-io/react-auth` for authentication.

### Core Layout

#### [MODIFY] [app/layout.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/app/layout.tsx)
- Wrap the application in a PrivyProvider (with a placeholder App ID) and ThemeProvider.
- Add a global navigation bar and footer.
- Add background effects (dark gradients, subtle blur, glassmorphism) to the `body`.

#### [MODIFY] [app/globals.css](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/app/globals.css)
- Configure Tailwind CSS v4 variables for dark mode, glowing accents, and glassmorphism utilities.
- Apply modern typography (e.g., Inter) and customize base styles for the dark futuristic theme.

### Landing Page (/)

#### [MODIFY] [app/page.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/app/page.tsx)
- Build a Hero section with bold typography, large spacing, smooth fade, slide, and scale animations.
- Add an Infinite Marquee feature showcasing crypto assets, partners, or ChadWallet features.
- Incorporate floating effects on decorative elements or 3D mockups.

#### [NEW] [components/sections/hero.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/sections/hero.tsx)
- Implement the Hero component with Framer Motion animations.

#### [NEW] [components/features/marquee.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/features/marquee.tsx)
- Implement the infinite marquee component for seamless scrolling elements.

### Trading Page (/trade)

#### [NEW] [app/trade/page.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/app/trade/page.tsx)
- Create the trading dashboard layout, ensuring it is responsive and works perfectly on mobile and desktop.

#### [NEW] [components/features/trading-view.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/features/trading-view.tsx)
- Implement the TradingView Widget integration for advanced charting.

#### [NEW] [components/features/token-swap.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/features/token-swap.tsx)
- Implement a token swap interface integrating BirdEye API data (or mock data) and Privy for wallet connection.

### Reusable UI Components (shadcn/ui & custom)

#### [NEW] [components/ui/button.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/ui/button.tsx)
- Premium button component with hover glow and smooth transition effects.

#### [NEW] [components/ui/card.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/ui/card.tsx)
- Reusable card layout with subtle blur (glassmorphism) and rounded corners.

#### [NEW] [components/ui/header.tsx](file:///c:/Users/Pachaiyappan%20M/Projects/Websites/chadwallet/components/ui/header.tsx)
- Navigation bar with the ChadWallet logo, main links, and a "Connect Wallet" button.

## Verification Plan

### Automated Tests
- Run `npm run build` and `npm run lint` to ensure no TypeScript or Next.js build errors.

### Manual Verification
- Start the development server (`npm run dev`) and visually verify the layout, animations, and dark futuristic theme on both desktop and mobile simulator views.
- Test the "Connect Wallet" flow via Privy (using a demo configuration).
- Check that the TradingView widget loads correctly on `/trade`.
- Ensure all components are under the 250-line limit for maintainability.
