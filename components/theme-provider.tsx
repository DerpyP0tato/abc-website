'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({
  children,
  enableDarkMode = true,
  ...props
}: ThemeProviderProps & { enableDarkMode?: boolean }) {
  const forcedTheme = enableDarkMode ? undefined : "light"

  return (
    <NextThemesProvider
      {...props}
      forcedTheme={forcedTheme}
    >
      {children}
    </NextThemesProvider>
  )
}
