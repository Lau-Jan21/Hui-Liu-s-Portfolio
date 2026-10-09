import { Atom, HeartHandshake, Code2, NotebookPen, PenLine, GraduationCap, Layers } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';
import PostCard from '@/components/post-card';
import ScrollReveal from '@/components/scroll-reveal';
import SocialLinks from '@/components/social-links';
import { collections, type Post, type Profile } from '@/lib/types';
const icons = [Atom, HeartHandshake, Code2, NotebookPen];
export default function Journal({ posts, profile, owner, unavailable = false }: { posts: Post[]; profile: Profile; owner: boolean; unavailable?: boolean }) {
  const skills = profile.skills.split(/[,，\n]/).map(s => s.trim()).filter(Boolean);
  const courses = profile.courses.split(/[,，\n]/).map(s => s.trim()).filter(Boolean);
  return <div className="site-shell developer-home"><SiteHeader active="home" /><main>
    <section className="home-band home-hero" aria-labelledby="hero-name"><div className="home-band-inner minimal-hero">
      <div className="minimal-hero-copy">
        <h1 id="hero-name">Hui Liu</h1>
        <h2>{profile.heroTitle}</h2>
        <div className="hero-introduction">
        <div className="minimal-hero-description">{profile.heroDescription.split(/\n+/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <div className="hero-actions"><a href="/about" className="button hero-contact">About Me</a><a href="/collection/research" className="button hero-projects">View Projects</a></div>
        </div>
        <SocialLinks profile={profile} />
      </div>
      <div className="minimal-hero-photo"><img src="/hui-portrait-v2.jpg" alt={`${profile.name}的个人照片`} width="390" height="390" fetchPriority="high" /></div>
    </div></section>
    <section className="home-band home-technical" aria-labelledby="technical-heading"><div className="home-band-inner technical-summary">
      <h2 id="technical-heading">技术栈与主修课程</h2>
      <div className="technical-row"><h3><Code2 size={18} />技术栈</h3><ScrollReveal className="technical-tags" waitForScroll stagger>{skills.map((skill, i) => <span key={`${skill}-${i}`} style={{transitionDelay: `${i * 90}ms`}}>{skill}</span>)}</ScrollReveal></div>
      <div className="technical-row"><h3><GraduationCap size={18} />主修课程</h3><ScrollReveal className="technical-tags course-tags" waitForScroll stagger>{courses.map((course, i) => <span key={`${course}-${i}`} style={{transitionDelay: `${i * 90}ms`}}>{course}</span>)}</ScrollReveal></div>
    </div></section>
    <section id="explore" className="home-band home-explore" aria-labelledby="explore-heading"><div className="home-band-inner developer-collections">
      <div className="home-section-heading"><div><h2 id="explore-heading">我的探索与记录</h2></div>{owner && <a className="text-button" href="/studio/new"><PenLine size={16} />添加内容</a>}</div>
      <div className="bento-collections">{collections.map((c, i) => {
        const Icon = icons[i];
        return <ScrollReveal key={c.slug} waitForScroll direction={i < 2 ? 'left' : 'right'} delay={(i % 2) * 90}><a className="bento-card collection-card interactive-card" href={`/collection/${c.slug}`}>
          <div className="card-topline"><Icon size={23} strokeWidth={1.6} /></div>
          <h3>{c.title}</h3>{c.slug === 'journal' ? <p>生活感悟 / 成长经历</p> : c.topics.length > 0 && <p>{c.topics.join(' / ')}</p>}
        </a></ScrollReveal>;
      })}</div>
    </div></section>
    {unavailable ? <div className="home-unavailable" role="status">内容暂时无法加载，请稍后刷新重试。</div> : posts.length > 0 ? <section className="home-band home-recent"><div className="home-band-inner developer-recent"><div className="home-section-heading"><div><h2>最近更新</h2></div><Layers size={20} /></div><div className="home-posts">{posts.slice(0, 3).map((post, index) => <ScrollReveal key={post.id} delay={index * 80}><PostCard post={post} index={index} /></ScrollReveal>)}</div></div></section> : null}
  </main><SiteFooter compact /></div>;
}
