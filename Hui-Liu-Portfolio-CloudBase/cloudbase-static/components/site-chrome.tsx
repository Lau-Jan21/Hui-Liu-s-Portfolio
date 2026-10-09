import { PenLine } from 'lucide-react';
import { collections } from '@/lib/types';
import { ThemeToggle } from '@/components/theme-controls';
export function SiteHeader({ studio = false, active = '' }: { studio?: boolean; active?: string }) {
 return <header className="site-header"><a href="/" className="brand" aria-label="个人主页首页"><span className="brand-mark">L<span>H.</span></span><span className="brand-name">个人主页<small>Hui Liu&apos;s Portfolio</small></span></a><nav aria-label="主导航"><a className={active === 'home' ? 'active' : ''} aria-current={active === 'home' ? 'page' : undefined} href="/">首页</a><a className={active === 'about' ? 'active' : ''} aria-current={active === 'about' ? 'page' : undefined} href="/about">个人简介</a>{collections.map(c => <a key={c.slug} className={active === c.slug ? 'active' : ''} aria-current={active === c.slug ? 'page' : undefined} href={`/collection/${c.slug}`}>{c.title}</a>)}</nav><div className="header-actions"><ThemeToggle />{studio && <a className={'studio-link' + (studio ? ' active' : '')} href="/studio"><PenLine size={16} /><span>内容管理</span></a>}</div></header>;
}
export function SiteFooter({ compact = false }: { compact?: boolean }) { return <footer className="site-footer"><a className="footer-brand" href="/">个人主页<span>Hui Liu&apos;s Portfolio</span></a>{!compact && <p>在探索中学习，在记录中成长。</p>}</footer>; }
