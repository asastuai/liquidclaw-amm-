import { bsc, base, baseSepolia } from "wagmi/chains"

const EXPLORERS: Record<number, string> = {
  [bsc.id]: "https://bscscan.com",
  [base.id]: "https://basescan.org",
  [baseSepolia.id]: "https://sepolia.basescan.org",
}

export function getExplorerUrl(chainId: number): string {
  return EXPLORERS[chainId] ?? EXPLORERS[bsc.id]
}

export function getTxUrl(chainId: number, txHash: string): string {
  return `${getExplorerUrl(chainId)}/tx/${txHash}`
}

export function getAddressUrl(chainId: number, address: string): string {
  return `${getExplorerUrl(chainId)}/address/${address}`
}
