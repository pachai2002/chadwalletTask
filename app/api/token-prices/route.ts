import { NextResponse } from "next/server";

const TOKENS = [
  { symbol: "SOL",    address: "So11111111111111111111111111111111111111112" },
  { symbol: "USDC",   address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
  { symbol: "JUP",    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" },
  { symbol: "BONK",   address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
  { symbol: "WIF",    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm" },
  { symbol: "RAY",    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R" },
  { symbol: "ORCA",   address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE" },
  { symbol: "PYTH",   address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3" },
  { symbol: "MEME",   address: "MEmESSPBPizHMSBzHGH5oBY9bQgCHcMSR8TPo5cgPzb" },
  { symbol: "POPCAT", address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr" },
];

const MOCK_RESPONSE = {
  success: true,
  data: {
    "So11111111111111111111111111111111111111112": { value: 145.20, priceChange24h: 4.72 },
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { value: 1.00, priceChange24h: 0.01 },
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": { value: 1.12, priceChange24h: -1.45 },
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { value: 0.00002241, priceChange24h: 12.35 },
    "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { value: 2.34, priceChange24h: -5.12 },
    "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": { value: 3.42, priceChange24h: 2.89 },
    "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE": { value: 1.87, priceChange24h: -0.56 },
    "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3": { value: 0.78, priceChange24h: 1.23 },
    "MEmESSPBPizHMSBzHGH5oBY9bQgCHcMSR8TPo5cgPzb": { value: 0.0125, priceChange24h: 18.72 },
    "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": { value: 1.45, priceChange24h: 9.61 },
  }
};

const BIRDEYE_API_KEY = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || "";

// Simple in-memory cache
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function GET() {
  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return NextResponse.json(cachedData);
  }

  if (!BIRDEYE_API_KEY) {
    console.warn("BirdEye API Key is missing. Using server-side mock fallbacks.");
    return NextResponse.json(MOCK_RESPONSE);
  }

  try {
    const addresses = TOKENS.map((t) => t.address).join(",");
    const res = await fetch(
      `https://public-api.birdeye.so/defi/multi_price?list_address=${addresses}`,
      {
        headers: {
          "X-API-KEY": BIRDEYE_API_KEY,
          "x-chain": "solana",
          "accept": "application/json",
        },
        // We handle caching inside Route Handler state, but we also specify a small next cache limit
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`BirdEye API returned status ${res.status}: ${errorText}. Using fallback data.`);
      
      // Cache the mock response briefly so we don't spam the API on rate limits/unauthorized errors
      cachedData = MOCK_RESPONSE;
      lastFetchTime = now;
      return NextResponse.json(MOCK_RESPONSE);
    }

    const json = await res.json();
    cachedData = json;
    lastFetchTime = now;
    return NextResponse.json(json);
  } catch (err: any) {
    console.error("Failed to fetch prices from BirdEye:", err);
    // Cache the mock response on network failures
    cachedData = MOCK_RESPONSE;
    lastFetchTime = now;
    return NextResponse.json(MOCK_RESPONSE);
  }
}
