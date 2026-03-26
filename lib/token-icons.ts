/** Shared token icon mapping — single source of truth */
export const TOKEN_ICONS: Record<string, string> = {
  LCLAW: "/images/lobster-mascot.jpg",
  WETH: "/images/tokens/eth.png",
  ETH: "/images/tokens/eth.png",
  USDC: "/images/tokens/usdc.png",
  USDT: "/images/tokens/usdc.png", // fallback to USDC icon
  VIRTUAL: "/images/tokens/virtual.png",
  DAI: "/images/tokens/usdc.png", // fallback to USDC icon
  cbETH: "/images/tokens/eth.png", // fallback to ETH icon
}

export const DEFAULT_TOKEN_ICON = "/images/tokens/eth.png"

export function getTokenIcon(symbol: string): string {
  return TOKEN_ICONS[symbol] ?? DEFAULT_TOKEN_ICON
}
