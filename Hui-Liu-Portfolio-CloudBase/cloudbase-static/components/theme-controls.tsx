'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="hui-portfolio-theme" disableTransitionOnChange>{children}</ThemeProvider>;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === 'dark';
  const label = dark ? '切换到日间模式' : '切换到夜间模式';
  return <button type="button" className="theme-toggle" aria-label={label} title={label} aria-pressed={dark} onClick={() => setTheme(dark ? 'light' : 'dark')}>{dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}</button>;
}
