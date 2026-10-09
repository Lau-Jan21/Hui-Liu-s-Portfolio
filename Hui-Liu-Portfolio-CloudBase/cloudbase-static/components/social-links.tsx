import { Mail, Phone } from 'lucide-react';
import type { Profile } from '@/lib/types';
export default function SocialLinks({ profile }: { profile: Profile }) {
  const platforms = [
    { key: 'github', name: 'GitHub', icon: 'github', href: profile.github },
    { key: 'wechat', name: '微信', icon: 'wechat', account: profile.wechat },
    { key: 'qq', name: 'QQ', icon: 'qq', account: profile.qq },
    { key: 'xiaohongshu', name: '小红书', icon: 'xiaohongshu', href: profile.xiaohongshu },
    { key: 'douyin', name: '抖音', icon: 'tiktok', href: profile.douyin },
  ];
  return <nav className="social-links" aria-label="社交链接">
    {profile.phone ? <a href={`tel:${profile.phone.replace(/[ ()-]/g, '')}`} aria-label="拨打电话" title={`电话：${profile.phone}`}><Phone size={22} strokeWidth={1.7} /></a> : <span className="social-unconfigured" aria-label="电话号码暂未填写" title="电话号码暂未填写"><Phone size={22} strokeWidth={1.7} /></span>}
    {profile.email ? <a href={`mailto:${profile.email}`} aria-label="发送邮件" title="邮箱"><Mail size={23} strokeWidth={1.7} /></a> : <span className="social-unconfigured" aria-label="邮箱暂未填写" title="邮箱暂未填写"><Mail size={23} strokeWidth={1.7} /></span>}
    {profile.blog ? <a href={profile.blog} target="_blank" rel="noopener noreferrer" aria-label="知乎主页" title="知乎"><span className="social-brand-icon" aria-hidden="true" style={{maskImage: 'url(/social/zhihu.svg)', WebkitMaskImage: 'url(/social/zhihu.svg)'}} /></a> : <span className="social-unconfigured" aria-label="知乎账号暂未填写" title="知乎账号暂未填写"><span className="social-brand-icon" aria-hidden="true" style={{maskImage: 'url(/social/zhihu.svg)', WebkitMaskImage: 'url(/social/zhihu.svg)'}} /></span>}
    {platforms.map(item => {
      const icon = <span className="social-brand-icon" aria-hidden="true" style={{ maskImage: `url(/social/${item.icon}.svg)`, WebkitMaskImage: `url(/social/${item.icon}.svg)` }} />;
      if (item.href) return <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}主页`} title={item.name}>{icon}</a>;
      if (item.account) return <details key={item.key} className="social-account"><summary aria-label={`查看${item.name}账号`} title={item.name}>{icon}</summary><div className="social-account-popover"><strong>{item.name}账号</strong><span>{item.account}</span></div></details>;
      return <span key={item.key} className="social-unconfigured" aria-label={`${item.name}账号暂未填写`} title={`${item.name}账号暂未填写`}>{icon}</span>;
    })}
  </nav>;
}
