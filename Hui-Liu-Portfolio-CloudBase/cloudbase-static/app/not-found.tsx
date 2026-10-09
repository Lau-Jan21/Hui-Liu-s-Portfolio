import { SiteHeader, SiteFooter } from '@/components/site-chrome';
export default function NotFound(){return <div className="site-shell"><SiteHeader/><main className="studio-main"><div className="login-card"><span className="eyebrow">404</span><h1>这一页，还没找到</h1><p>页面可能不存在，或内容尚未发布。</p><a href="/" className="button primary">返回首页</a></div></main><SiteFooter/></div>;}
