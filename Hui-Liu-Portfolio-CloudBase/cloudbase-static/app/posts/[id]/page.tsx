import { getPost, listPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';
import Markdown from '@/components/markdown';
import { collectionFor, formatDate } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) { const { id }=await params; const p=await getPost(id); return p ? { title:p.title, description:p.excerpt } : { title:'文章未找到' }; }
export default async function ReadPost({ params }: { params: Promise<{ id: string }> }) {
  const { id }=await params; const post=await getPost(id); if(!post)notFound(); const owner=false;
  const pdfFiles: Record<string, string> = {
  "university-competition-guide": "/files/competition-guide.pdf",
  "major-transfer-guide": "/files/major-transfer-guide.pdf",
  "online-courses-1": "/files/online-courses-1.pdf",
  "online-courses-2": "/files/online-courses-2.pdf",
  "social-guide-1": "/files/social-guide-1.pdf",
};

const pdfUrl = pdfFiles[post.id];
  return <div className="site-shell"><SiteHeader active={collectionFor(post.category)?.slug}/><main className="reader"><div className="reader-top"><a href={`/collection/${collectionFor(post.category)?.slug || "journal"}`}>返回{post.category}</a></div><article><header><span className="category-badge">{post.category}{post.topic?` / ${post.topic}`:""}</span><h1>{post.title}</h1><div className="reader-meta"><span>{formatDate(post.publishedAt||post.createdAt)}</span><span>{post.content.replace(/\s/g,'').length.toLocaleString()} 字</span>{owner&&<a href={`/studio/${id}`}>编辑文章</a>}</div></header><Markdown content={post.content} />

{pdfUrl && (
  <section style={{ marginTop: 24 }}>
    <a
      className="button secondary"
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      打开 PDF 原文
    </a>

    <iframe
      src={pdfUrl}
      title={post.title}
      style={{
        display: "block",
        width: "100%",
        height: "80vh",
        border: "none",
        marginTop: 20,
      }}
    />
  </section>
)}<div className="tags" style={{marginTop:35,color:'var(--primary)',fontSize:14}}>{post.tags.map(t=><span key={t}>#{t}</span>)}</div></article></main><SiteFooter/></div>;
}

export async function generateStaticParams() { return (await listPosts(false)).map(p=>({id:p.id})); }
