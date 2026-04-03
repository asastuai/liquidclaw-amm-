"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useAccount } from "wagmi"
import { useReadContract, useBalance, useChainId } from "wagmi"
import { formatUnits, type Address } from "viem"
import { getTokens, type TokenInfo } from "@/lib/contracts/addresses"
import { ERC20_ABI } from "@/lib/contracts/abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as Address

function TokenRow({
  token,
  onSelect,
  isSelected,
}: {
  token: TokenInfo
  onSelect: (token: TokenInfo) => void
  isSelected: boolean
}) {
  const { address: userAddress } = useAccount()

  const { data: ethBalance } = useBalance({
    address: userAddress,
    query: { enabled: !!userAddress && !!token.isNative },
  })

  const { data: tokenBalance } = useReadContract({
    address: token.isNative ? undefined : (token.address as Address),
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && !token.isNative && token.address !== ZERO_ADDRESS,
    },
  })

  const balance = token.isNative
    ? ethBalance?.value
    : (tokenBalance as bigint | undefined)

  const formattedBalance =
    balance !== undefined ? parseFloat(formatUnits(balance, token.decimals)).toFixed(4) : null

  return (
    <button
      onClick={() => onSelect(token)}
      disabled={isSelected}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
        isSelected
          ? "bg-muted/50 opacity-50 cursor-not-allowed"
          : "hover:bg-muted/50 cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={token.logo} alt={token.symbol} className="w-10 h-10 rounded-full bg-muted object-cover" />
        <div className="text-left">
          <div className="font-semibold text-foreground">{token.symbol}</div>
          <div className="text-sm text-muted-foreground">{token.name}</div>
        </div>
      </div>
      <div className="text-right">
        {formattedBalance !== null ? (
          <span className="text-sm text-muted-foreground">{formattedBalance}</span>
        ) : (
          <span className="text-sm text-muted-foreground/50">-</span>
        )}
      </div>
    </button>
  )
}

interface TokenSelectModalProps {
  open: boolean
  onClose: () => void
  onSelect: (token: TokenInfo) => void
  selectedToken?: TokenInfo | null
}

export function TokenSelectModal({
  open,
  onClose,
  onSelect,
  selectedToken,
}: TokenSelectModalProps) {
  const [search, setSearch] = useState("")
  const chainId = useChainId()
  const tokens = useMemo(() => getTokens(chainId), [chainId])

  const filteredTokens = useMemo(() => {
    if (!search) return tokens
    const q = search.toLowerCase()
    return tokens.filter(
      (t) =>
        t.symbol.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q)
    )
  }, [search])

  const handleSelect = (token: TokenInfo) => {
    onSelect(token)
    onClose()
    setSearch("")
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="max-h-[360px] overflow-y-auto -mx-2">
          {filteredTokens.map((token) => (
            <TokenRow
              key={`${token.symbol}-${token.address}`}
              token={token}
              onSelect={handleSelect}
              isSelected={selectedToken?.symbol === token.symbol}
            />
          ))}
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
