'use client';
import { useState } from 'react';
import { Search, NotebookPen, PenLine } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';
import EssayCard from '@/components/essay-card';
import PostCard from '@/components/post-card';
import { type Collection, type Post } from '@/lib/types';
export default function CollectionView({ collection: c, posts, owner, unavailable = false }: { collection: Collection; posts: Post[]; owner: boolean; unavailable?: boolean }) {
 const defaultTopic = c.topics[0] || '全部';
 const [topic, setTopic] = useState<string>(defaultTopic); const [query, setQuery] = useState('');
 const canSearch = c.slug === 'knowledge' || c.slug === 'journal';
 const searchQuery = canSearch ? query.trim() : '';
 const filtered = posts.filter(p => (topic === '全部' || p.topic === topic) && (!searchQuery || [p.title, p.excerpt, p.content, ...p.tags].join(' ').toLowerCase().includes(searchQuery.toLowerCase())));
 if (c.slug === 'practice' && topic === '学生工作') {
  const startTime = (post: Post) => {
   const match = post.content.match(/^- 任职时间：(\d{4})[.年/-](\d{1,2})/m);
   return match ? Number(match[1]) * 12 + Number(match[2]) : (new Date(post.publishedAt || post.createdAt).getFullYear() * 12 + new Date(post.publishedAt || post.createdAt).getMonth() + 1);
  };
  filtered.sort((a,b) => startTime(a) - startTime(b));
 }
 const tabs = c.topics.length ? [...c.topics] : ['全部'];
 return <div className="site-shell"><SiteHeader active={c.slug} /><main><section className="collection-hero"><div><div className="breadcrumbs"><a href="/">首页</a><span>/</span><span>{c.title}</span></div><h1>{c.title}</h1>{c.description && <p>{c.description}</p>}</div><span className="collection-number" aria-hidden="true">{c.number}</span></section><section className="collection-content"><Tabs value={topic} onValueChange={setTopic}><div className="collection-toolbar">{c.slug !== 'journal' && <TabsList className={`category-tabs${['research', 'practice', 'knowledge'].includes(c.slug) ? ' research-tabs' : ''}`} aria-label={`${c.title}子栏目`}>{tabs.map(t => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>}{canSearch && <label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索这个板块…" aria-label={`搜索${c.title}的标题、正文和标签`} /></label>}{owner && <a className="text-button" href={`/studio/new?section=${c.slug}${topic !== '全部' ? `&topic=${encodeURIComponent(topic)}` : ''}`}><PenLine size={15} />添加内容</a>}</div>{tabs.map(t => <TabsContent key={t} value={t}>{unavailable ? <Empty className="journal-empty"><EmptyHeader><EmptyTitle>内容暂时无法加载</EmptyTitle><EmptyDescription>请稍后重试，已保存的内容仍然保留。</EmptyDescription></EmptyHeader><button className="button secondary" onClick={() => location.reload()}>重新加载</button></Empty> : filtered.length ? <div className={`post-list${c.slug === 'journal' ? ' essay-list' : filtered.every(p => p.topic === '比赛奖项' || p.topic === '志愿服务') ? ' award-list' : ''}`}>{filtered.map((p, i) => c.slug === 'journal' ? <EssayCard post={p} key={p.id} /> : <PostCard post={p} index={i} key={p.id} />)}</div> : <Empty className="journal-empty"><EmptyHeader><EmptyMedia className="empty-icon"><NotebookPen size={29} strokeWidth={1.3} /></EmptyMedia><EmptyTitle>{searchQuery ? '暂时没有找到相关内容' : topic === '全部' ? '还没有公开内容' : `${topic}，正在整理中。`}</EmptyTitle><EmptyDescription>{searchQuery ? '试试其他关键词，或切换一个栏目。' : '内容将在发布后显示。'}</EmptyDescription></EmptyHeader>{searchQuery ? <button className="button secondary" onClick={() => { setQuery(''); }}>清除搜索</button> : owner ? <a className="button primary" href={`/studio/new?section=${c.slug}`}>添加第一篇记录</a> : null}</Empty>}</TabsContent>)}</Tabs>{!posts.length && !unavailable && <div className="topic-outline" aria-label="栏目目录">{c.topics.map((t, i) => <div key={t}><span className="mono">0{i + 1}</span><h3>{t}</h3><p>内容陆续整理中</p></div>)}</div>}</section></main><SiteFooter /></div>;
}
