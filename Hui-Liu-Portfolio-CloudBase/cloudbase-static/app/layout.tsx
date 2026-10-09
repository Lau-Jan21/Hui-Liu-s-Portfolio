import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { SiteThemeProvider } from '@/components/theme-controls';
import './globals.css';
export const metadata: Metadata = {
 title: { default: "刘慧的个人主页 (Hui Liu's Portfolio)", template: "%s · 刘慧的个人主页 (Hui Liu's Portfolio)" },
 description: '个人简介、科研竞赛、社会实践、知识沉淀与日常随笔。在探索中学习，在记录中成长。',
 icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="zh-CN" suppressHydrationWarning><head><link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/NotoSansSC-ui.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><SiteThemeProvider>{children}<Toaster position="bottom-center" /></SiteThemeProvider></body></html>;
}
