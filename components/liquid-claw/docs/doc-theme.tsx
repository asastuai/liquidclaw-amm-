'use client'

import { createContext, useContext } from 'react'

export const DocThemeContext = createContext<{ dark: boolean }>({ dark: false })
export function useDocTheme() { return useContext(DocThemeContext) }
