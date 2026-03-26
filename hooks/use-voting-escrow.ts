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
import { parseUnits, formatUnits, formatEther, maxUint256, type Address } from "viem"
import { getAddresses } from "@/lib/contracts/addresses"
import { VOTING_ESCROW_ABI, VOTER_ABI, GAUGE_ABI, ERC20_ABI } from "@/lib/contracts/abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

export interface VeNFT {
  tokenId: bigint
  lockedAmount: bigint
  lockEnd: bigint
  isPermanent: boolean
  votingPower: bigint
}

// Read user's veNFTs
export function useUserVeNFTs() {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  // How many veNFTs does the user hold?
  const { data: nftCount } = useReadContract({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && addresses.votingEscrow !== ZERO_ADDRESS,
    },
  })

  const count = Number(nftCount ?? 0n)

  // Get token IDs via ownerToNFTokenIdList(address, index)
  const tokenIdCalls = Array.from({ length: Math.min(count, 20) }, (_, i) => ({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "ownerToNFTokenIdList" as const,
    args: [userAddress!, BigInt(i)] as [Address, bigint],
  }))

  const { data: tokenIdResults, isLoading: isLoadingIds, isError: idsError } = useReadContracts({
    contracts: tokenIdCalls,
    query: { enabled: count > 0 && !!userAddress },
  })

  const tokenIds: bigint[] = (tokenIdResults ?? [])
    .filter((r) => r.status === "success")
    .map((r) => r.result as bigint)

  // Get lock details for each
  const lockCalls = tokenIds.map((id) => ({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "locked" as const,
    args: [id] as [bigint],
  }))

  const { data: lockResults, isLoading: isLoadingLocks } = useReadContracts({
    contracts: lockCalls,
    query: { enabled: tokenIds.length > 0 },
  })

  // Get voting power for each
  const powerCalls = tokenIds.map((id) => ({
    address: addresses.votingEscrow,
    abi: VOTING_ESCROW_ABI,
    functionName: "balanceOfNFT" as const,
    args: [id] as [bigint],
  }))

  const { data: powerResults, isLoading: isLoadingPower } = useReadContracts({
    contracts: powerCalls,
    query: { enabled: tokenIds.length > 0 },
  })

  const veNFTs: VeNFT[] = tokenIds.map((tokenId, i) => {
    const lock = lockResults?.[i]
    const power = powerResults?.[i]

    // locked() returns LockedBalance struct as tuple (int128, uint256, bool)
    let lockedAmount = 0n
    let lockEnd = 0n
    let isPermanent = false

    if (lock?.status === "success" && lock.result) {
      const res = lock.result as any
      // Handle both array and object return formats
      if (Array.isArray(res)) {
        lockedAmount = res[0] < 0n ? -res[0] : res[0]
        lockEnd = res[1]
        isPermanent = res[2] ?? false
      } else if (typeof res === "object") {
        lockedAmount = res.amount < 0n ? -res.amount : res.amount
        lockEnd = res.end ?? 0n
        isPermanent = res.isPermanent ?? false
      }
    }

    return {
      tokenId,
      lockedAmount,
      lockEnd,
      isPermanent,
      votingPower: power?.status === "success" ? (power.result as bigint) : 0n,
    }
  })

  // isLoading is true only while actively fetching, not stuck forever
  const isLoading = count > 0 && (isLoadingIds || (tokenIds.length > 0 && isLoadingLocks))

  // If IDs errored out, stop loading
  return { veNFTs, count, isLoading: idsError ? false : isLoading }
}

// Create lock
export function useCreateLock() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)
  const { address: userAddress } = useAccount()

  // LCLAW balance
  const { data: lclawBalance } = useReadContract({
    address: addresses.lclaw,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && addresses.lclaw !== ZERO_ADDRESS,
    },
  })

  // LCLAW allowance for VotingEscrow
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: addresses.lclaw,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: userAddress ? [userAddress, addresses.votingEscrow] : undefined,
    query: {
      enabled: !!userAddress && addresses.lclaw !== ZERO_ADDRESS && addresses.votingEscrow !== ZERO_ADDRESS,
    },
  })

  const {
    writeContract: approveWrite,
    data: approveHash,
    isPending: isApproving,
  } = useWriteContract()

  const { isSuccess: approveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash })

  const {
    writeContract: lockWrite,
    data: lockHash,
    isPending: isLocking,
    error: lockError,
  } = useWriteContract()

  const { isSuccess: lockConfirmed, isLoading: lockConfirming } =
    useWaitForTransactionReceipt({ hash: lockHash })

  useEffect(() => {
    if (approveConfirmed) refetchAllowance()
  }, [approveConfirmed, refetchAllowance])

  const approveLclaw = useCallback(() => {
    if (addresses.lclaw === ZERO_ADDRESS) return
    approveWrite({
      address: addresses.lclaw,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [addresses.votingEscrow, maxUint256],
    })
  }, [addresses, approveWrite])

  const createLock = useCallback(
    (amount: string, durationWeeks: number) => {
      const parsed = parseUnits(amount, 18)
      const durationSeconds = BigInt(durationWeeks * 7 * 24 * 60 * 60)
      lockWrite({
        address: addresses.votingEscrow,
        abi: VOTING_ESCROW_ABI,
        functionName: "createLock",
        args: [parsed, durationSeconds],
      })
    },
    [addresses, lockWrite]
  )

  const needsApproval = (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) return false
    const parsed = parseUnits(amount, 18)
    return ((allowance as bigint) ?? 0n) < parsed
  }

  return {
    lclawBalance: formatUnits((lclawBalance as bigint) ?? 0n, 18),
    needsApproval,
    approveLclaw,
    isApproving: isApproving || (!!approveHash && !approveConfirmed),
    createLock,
    isLocking: isLocking || lockConfirming,
    lockConfirmed,
    lockHash,
    lockError,
  }
}

// Vote on gauges
export function useVote() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const {
    writeContract: voteWrite,
    data: voteHash,
    isPending: isVoting,
    error: voteError,
  } = useWriteContract()

  const { isSuccess: voteConfirmed, isLoading: voteConfirming } =
    useWaitForTransactionReceipt({ hash: voteHash })

  const vote = useCallback(
    (tokenId: bigint, pools: Address[], weights: bigint[]) => {
      voteWrite({
        address: addresses.voter,
        abi: VOTER_ABI,
        functionName: "vote",
        args: [tokenId, pools, weights],
      })
    },
    [addresses, voteWrite]
  )

  const reset = useCallback(
    (tokenId: bigint) => {
      voteWrite({
        address: addresses.voter,
        abi: VOTER_ABI,
        functionName: "reset",
        args: [tokenId],
      })
    },
    [addresses, voteWrite]
  )

  return {
    vote,
    reset,
    isVoting: isVoting || voteConfirming,
    voteConfirmed,
    voteHash,
    voteError,
  }
}

// Claim rewards from gauges
export function useClaimRewards() {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)

  const {
    writeContract: claimWrite,
    data: claimHash,
    isPending: isClaiming,
  } = useWriteContract()

  const { isSuccess: claimConfirmed, isLoading: claimConfirming } =
    useWaitForTransactionReceipt({ hash: claimHash })

  const claimRewards = useCallback(
    (gaugeAddresses: Address[]) => {
      claimWrite({
        address: addresses.voter,
        abi: VOTER_ABI,
        functionName: "claimRewards",
        args: [gaugeAddresses],
      })
    },
    [addresses, claimWrite]
  )

  return {
    claimRewards,
    isClaiming: isClaiming || claimConfirming,
    claimConfirmed,
    claimHash,
  }
}
