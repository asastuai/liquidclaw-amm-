// ============================================
// LiquidClaw Contract Addresses
// ============================================

import { type Address } from "viem"

export interface ContractAddresses {
  lclaw: Address
  router: Address
  poolFactory: Address
  votingEscrow: Address
  voter: Address
  minter: Address
  rewardsDistributor: Address
  factoryRegistry: Address
  aiVault: Address
  aiStrategyRegistry: Address
  weth: Address
  usdc: Address
  virtual: Address
}

// Base Mainnet (Chain ID: 8453)
// Deployed 2026-03-26 | Block: 43879468 | Deployer: 0x7c7Faf397dAC2a9Ae6FD902B47e36810913ca644
export const BASE_ADDRESSES: ContractAddresses = {
  lclaw: "0x3BcFcca5b86eD04a00D975BC7d9ceC408d5f299B",
  router: "0x5249dbb911aE1057a049cbFf131B5b0FA58d39b2",
  poolFactory: "0x5f172F3377921c93fd8b70C74BB4Cd023a8e6486",
  votingEscrow: "0x347D178b332C0E3DF68FEccA733780335D1D2B1a",
  voter: "0xB5aFF886cF06699438b77Fe898966858ea78c928",
  minter: "0x4eBa60705742A56A1734cD35Ce4f88fC2e976905",
  rewardsDistributor: "0xc64eD8215CA17Ba02551ED721C0F4ecEd566D51B",
  factoryRegistry: "0x5259EC22e51A734506cB2f4a810E92Ad0F2C0927",
  aiVault: "0x1D684Ef754ED6d216750de1236461Ca5ba92Ab88",
  aiStrategyRegistry: "0xcE58B16D2C38e01c27A3f97f014742a8e0c556cC",
  // Known Base mainnet tokens
  weth: "0x4200000000000000000000000000000000000006",
  usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  virtual: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
}

// Base Sepolia Testnet (Chain ID: 84532)
// Deployed 2026-03-25 | Deployer: 0x7c7Faf397dAC2a9Ae6FD902B47e36810913ca644
export const BASE_SEPOLIA_ADDRESSES: ContractAddresses = {
  lclaw: "0x8D4DeBA522eB9FaB5Edb7DF61398C450FF6898c3",
  router: "0xc64eD8215CA17Ba02551ED721C0F4ecEd566D51B",
  poolFactory: "0x3BcFcca5b86eD04a00D975BC7d9ceC408d5f299B",
  votingEscrow: "0xE905259865327516096561FEE8E0832A311BC0c9",
  voter: "0x5259EC22e51A734506cB2f4a810E92Ad0F2C0927",
  minter: "0xB5aFF886cF06699438b77Fe898966858ea78c928",
  rewardsDistributor: "0x347D178b332C0E3DF68FEccA733780335D1D2B1a",
  factoryRegistry: "0x3EB4F29B50B854E10E9927F826c3186e4e84A20E",
  aiVault: "0x5249dbb911aE1057a049cbFf131B5b0FA58d39b2",
  aiStrategyRegistry: "0x4eBa60705742A56A1734cD35Ce4f88fC2e976905",
  weth: "0x4200000000000000000000000000000000000006",
  usdc: "0x0000000000000000000000000000000000000000",
  virtual: "0x0000000000000000000000000000000000000000",
}

export const SUPPORTED_CHAIN_IDS = [8453, 84532] as const

export function isSupportedChain(chainId: number): boolean {
  return (SUPPORTED_CHAIN_IDS as readonly number[]).includes(chainId)
}

export function getAddresses(chainId: number): ContractAddresses {
  switch (chainId) {
    case 8453:
      return BASE_ADDRESSES
    case 84532:
      return BASE_SEPOLIA_ADDRESSES
    default:
      // Return Base addresses but log warning — NetworkGuard should prevent this
      if (typeof window !== "undefined") {
        console.warn(`[LiquidClaw] Unsupported chain ${chainId}. Falling back to Base mainnet addresses.`)
      }
      return BASE_ADDRESSES
  }
}

// Common token list for the swap UI
export interface TokenInfo {
  address: Address
  symbol: string
  name: string
  decimals: number
  logo: string
  isNative?: boolean
}

export const BASE_TOKENS: TokenInfo[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    logo: "/images/tokens/eth.png",
    isNative: true,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    logo: "/images/tokens/eth.png",
  },
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logo: "/images/tokens/usdc.png",
  },
  {
    address: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
    symbol: "VIRTUAL",
    name: "Virtuals Protocol",
    decimals: 18,
    logo: "/images/tokens/virtual.png",
  },
  {
    address: "0x3BcFcca5b86eD04a00D975BC7d9ceC408d5f299B",
    symbol: "LCLAW",
    name: "LiquidClaw",
    decimals: 18,
    logo: "/images/lobster-mascot.jpg",
  },
]
