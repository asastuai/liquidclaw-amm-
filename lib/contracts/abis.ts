// ============================================
// LiquidClaw Contract ABIs (Base chain)
// Minimal ABIs for frontend interaction
// ============================================

export const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
] as const

export const ROUTER_ABI = [
  {
    type: "function",
    name: "sortTokens",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
    ],
    outputs: [
      { name: "token0", type: "address" },
      { name: "token1", type: "address" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "poolFor",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "_factory", type: "address" },
    ],
    outputs: [{ name: "pool", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReserves",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "_factory", type: "address" },
    ],
    outputs: [
      { name: "reserveA", type: "uint256" },
      { name: "reserveB", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmountsOut",
    inputs: [
      { name: "amountIn", type: "uint256" },
      {
        name: "routes",
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "stable", type: "bool" },
          { name: "factory", type: "address" },
        ],
      },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteAddLiquidity",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "_factory", type: "address" },
      { name: "amountADesired", type: "uint256" },
      { name: "amountBDesired", type: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256" },
      { name: "amountB", type: "uint256" },
      { name: "liquidity", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteRemoveLiquidity",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "_factory", type: "address" },
      { name: "liquidity", type: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256" },
      { name: "amountB", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addLiquidity",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "amountADesired", type: "uint256" },
      { name: "amountBDesired", type: "uint256" },
      { name: "amountAMin", type: "uint256" },
      { name: "amountBMin", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256" },
      { name: "amountB", type: "uint256" },
      { name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addLiquidityETH",
    inputs: [
      { name: "token", type: "address" },
      { name: "stable", type: "bool" },
      { name: "amountTokenDesired", type: "uint256" },
      { name: "amountTokenMin", type: "uint256" },
      { name: "amountETHMin", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [
      { name: "amountToken", type: "uint256" },
      { name: "amountETH", type: "uint256" },
      { name: "liquidity", type: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
      { name: "liquidity", type: "uint256" },
      { name: "amountAMin", type: "uint256" },
      { name: "amountBMin", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256" },
      { name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETH",
    inputs: [
      { name: "token", type: "address" },
      { name: "stable", type: "bool" },
      { name: "liquidity", type: "uint256" },
      { name: "amountTokenMin", type: "uint256" },
      { name: "amountETHMin", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [
      { name: "amountToken", type: "uint256" },
      { name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapExactTokensForTokens",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      {
        name: "routes",
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "stable", type: "bool" },
          { name: "factory", type: "address" },
        ],
      },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapExactETHForTokens",
    inputs: [
      { name: "amountOutMin", type: "uint256" },
      {
        name: "routes",
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "stable", type: "bool" },
          { name: "factory", type: "address" },
        ],
      },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "swapExactTokensForETH",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      {
        name: "routes",
        type: "tuple[]",
        components: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "stable", type: "bool" },
          { name: "factory", type: "address" },
        ],
      },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "weth",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defaultFactory",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const

export const POOL_ABI = [
  {
    type: "function",
    name: "metadata",
    inputs: [],
    outputs: [
      { name: "dec0", type: "uint256" },
      { name: "dec1", type: "uint256" },
      { name: "r0", type: "uint256" },
      { name: "r1", type: "uint256" },
      { name: "st", type: "bool" },
      { name: "t0", type: "address" },
      { name: "t1", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReserves",
    inputs: [],
    outputs: [
      { name: "_reserve0", type: "uint256" },
      { name: "_reserve1", type: "uint256" },
      { name: "_blockTimestampLast", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAmountOut",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "tokenIn", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token0",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token1",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "stable",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimFees",
    inputs: [],
    outputs: [
      { name: "claimed0", type: "uint256" },
      { name: "claimed1", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
] as const

export const POOL_FACTORY_ABI = [
  {
    type: "function",
    name: "getPool",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "stable", type: "bool" },
    ],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allPools",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allPoolsLength",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFee",
    inputs: [
      { name: "pool", type: "address" },
      { name: "_stable", type: "bool" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPaused",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const

export const VOTING_ESCROW_ABI = [
  {
    type: "function",
    name: "createLock",
    inputs: [
      { name: "_value", type: "uint256" },
      { name: "_lockDuration", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseAmount",
    inputs: [
      { name: "_tokenId", type: "uint256" },
      { name: "_value", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "increaseUnlockTime",
    inputs: [
      { name: "_tokenId", type: "uint256" },
      { name: "_lockDuration", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOfNFT",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "locked",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [
      { name: "amount", type: "int128" },
      { name: "end", type: "uint256" },
      { name: "isPermanent", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerToNFTokenIdList",
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_index", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "_approved", type: "address" },
      { name: "_tokenId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const

export const VOTER_ABI = [
  {
    type: "function",
    name: "vote",
    inputs: [
      { name: "_tokenId", type: "uint256" },
      { name: "_poolVote", type: "address[]" },
      { name: "_weights", type: "uint256[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reset",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimRewards",
    inputs: [{ name: "_gauges", type: "address[]" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "gauges",
    inputs: [{ name: "pool", type: "address" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "poolForGauge",
    inputs: [{ name: "gauge", type: "address" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "weights",
    inputs: [{ name: "pool", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalWeight",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const

export const GAUGE_ABI = [
  {
    type: "function",
    name: "deposit",
    inputs: [{ name: "_amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "_amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getReward",
    inputs: [{ name: "_account", type: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "earned",
    inputs: [{ name: "_account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "_account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const

export const AI_VAULT_ABI = [
  {
    type: "function",
    name: "deposit",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emergencyWithdraw",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getUserTokenIds",
    inputs: [{ name: "_user", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserDepositCount",
    inputs: [{ name: "_user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "depositorOf",
    inputs: [{ name: "_tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalDeposited",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "operator",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const

export const AI_STRATEGY_REGISTRY_ABI = [
  {
    type: "function",
    name: "getActiveStrategies",
    inputs: [],
    outputs: [
      {
        name: "result",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "operator", type: "address" },
          { name: "active", type: "bool" },
          { name: "createdAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStrategy",
    inputs: [{ name: "_strategyId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "operator", type: "address" },
          { name: "active", type: "bool" },
          { name: "createdAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalStrategies",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const
