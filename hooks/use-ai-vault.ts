"use client"

import { useCallback, useEffect } from "react"
import {
  useAccount,
  useChainId,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { formatUnits, type Address } from "viem"
import { getAddresses } from "@/lib/contracts/addresses"
import {
  AI_VAULT_ABI,
  AI_STRATEGY_REGISTRY_ABI,
  VOTING_ESCROW_ABI,
} from "@/lib/contracts/abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

export interface AIStrategy {
  id: bigint
  name: string
  description: string
  operator: Address
  active: boolean
  createdAt: bigint
}

// Read vault stats
export function useAIVaultStats() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const { data: totalDeposited } = useReadContract({
    address: addresses.aiVault,
    abi: AI_VAULT_ABI,
    functionName: "totalDeposited",
    query: { enabled: addresses.aiVault !== ZERO_ADDRESS },
  })

  const { data: operator } = useReadContract({
    address: addresses.aiVault,
    abi: AI_VAULT_ABI,
    functionName: "operator",
    query: { enabled: addresses.aiVault !== ZERO_ADDRESS },
  })

  return {
    totalDeposited: Number(totalDeposited ?? 0n),
    operator: operator as Address | undefined,
  }
}

// Read user's deposited veNFTs in vault
export function useVaultDeposits() {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const { data: depositedIds, refetch: refetchIds } = useReadContract({
    address: addresses.aiVault,
    abi: AI_VAULT_ABI,
    functionName: "getUserTokenIds",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && addresses.aiVault !== ZERO_ADDRESS,
    },
  })

  const tokenIds = (depositedIds as bigint[] | undefined) ?? []

  // Get voting power for each deposited NFT
  const powerCalls = tokenIds.map((id) => ({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "balanceOfNFT" as const,
    args: [id] as [bigint],
  }))

  const { data: powerResults } = useReadContracts({
    contracts: powerCalls,
    query: { enabled: tokenIds.length > 0 },
  })

  // Get lock info for each
  const lockCalls = tokenIds.map((id) => ({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "locked" as const,
    args: [id] as [bigint],
  }))

  const { data: lockResults } = useReadContracts({
    contracts: lockCalls,
    query: { enabled: tokenIds.length > 0 },
  })

  const deposits = tokenIds.map((tokenId, i) => {
    const power = powerResults?.[i]
    const lock = lockResults?.[i]
    const lockData =
      lock?.status === "success"
        ? (lock.result as [bigint, bigint, boolean])
        : [0n, 0n, false] as [bigint, bigint, boolean]

    return {
      tokenId,
      votingPower: power?.status === "success" ? (power.result as bigint) : 0n,
      lockedAmount: lockData[0] < 0n ? -lockData[0] : lockData[0],
      lockEnd: lockData[1],
      isPermanent: lockData[2],
    }
  })

  const totalPower = deposits.reduce((sum, d) => sum + d.votingPower, 0n)

  return { deposits, totalPower, refetchIds }
}

// Deposit veNFT into AI Vault
export function useDepositToVault() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  // Approve veNFT for vault
  const {
    writeContract: approveWrite,
    data: approveHash,
    isPending: isApproving,
  } = useWriteContract()

  const { isSuccess: approveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash })

  // Deposit
  const {
    writeContract: depositWrite,
    data: depositHash,
    isPending: isDepositing,
    error: depositError,
  } = useWriteContract()

  const { isSuccess: depositConfirmed, isLoading: depositConfirming } =
    useWaitForTransactionReceipt({ hash: depositHash })

  const approveForVault = useCallback(
    (tokenId: bigint) => {
      approveWrite({
        address: addresses.votingEscrow,
        abi: VOTING_ESCROW_ABI,
        functionName: "approve",
        args: [addresses.aiVault, tokenId],
      })
    },
    [addresses, approveWrite]
  )

  const deposit = useCallback(
    (tokenId: bigint) => {
      depositWrite({
        address: addresses.aiVault,
        abi: AI_VAULT_ABI,
        functionName: "deposit",
        args: [tokenId],
      })
    },
    [addresses, depositWrite]
  )

  return {
    approveForVault,
    isApproving: isApproving || (!!approveHash && !approveConfirmed),
    approveConfirmed,
    deposit,
    isDepositing: isDepositing || depositConfirming,
    depositConfirmed,
    depositHash,
    depositError,
  }
}

// Withdraw veNFT from AI Vault
export function useWithdrawFromVault() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const {
    writeContract: withdrawWrite,
    data: withdrawHash,
    isPending: isWithdrawing,
  } = useWriteContract()

  const { isSuccess: withdrawConfirmed, isLoading: withdrawConfirming } =
    useWaitForTransactionReceipt({ hash: withdrawHash })

  const withdraw = useCallback(
    (tokenId: bigint) => {
      withdrawWrite({
        address: addresses.aiVault,
        abi: AI_VAULT_ABI,
        functionName: "withdraw",
        args: [tokenId],
      })
    },
    [addresses, withdrawWrite]
  )

  const emergencyWithdraw = useCallback(
    (tokenId: bigint) => {
      withdrawWrite({
        address: addresses.aiVault,
        abi: AI_VAULT_ABI,
        functionName: "emergencyWithdraw",
        args: [tokenId],
      })
    },
    [addresses, withdrawWrite]
  )

  return {
    withdraw,
    emergencyWithdraw,
    isWithdrawing: isWithdrawing || withdrawConfirming,
    withdrawConfirmed,
    withdrawHash,
  }
}

// Read AI strategies
export function useAIStrategies() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const { data: strategies, isLoading } = useReadContract({
    address: addresses.aiStrategyRegistry,
    abi: AI_STRATEGY_REGISTRY_ABI,
    functionName: "getActiveStrategies",
    query: {
      enabled: addresses.aiStrategyRegistry !== ZERO_ADDRESS,
    },
  })

  const parsed: AIStrategy[] = ((strategies as any[]) ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    operator: s.operator,
    active: s.active,
    createdAt: s.createdAt,
  }))

  return { strategies: parsed, isLoading }
}
