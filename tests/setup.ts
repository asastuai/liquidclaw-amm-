import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: { src: string; alt: string; width?: number; height?: number; className?: string }) => {
    const React = require('react')
    return React.createElement('img', { src, alt, width, height, className })
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    const React = require('react')
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock wagmi
vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  useChainId: () => 84532,
  useReadContract: () => ({ data: undefined, isLoading: false, error: null }),
  useReadContracts: () => ({ data: undefined, isLoading: false, error: null }),
  useWriteContract: () => ({ writeContract: vi.fn(), data: undefined, isPending: false }),
  useWaitForTransactionReceipt: () => ({ isLoading: false, isSuccess: false }),
  useBalance: () => ({ data: undefined }),
  useSendTransaction: () => ({ sendTransaction: vi.fn(), data: undefined, isPending: false }),
  useConfig: () => ({}),
}))

// Mock RainbowKit
vi.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: () => null,
}))

// Mock @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({}),
}))
