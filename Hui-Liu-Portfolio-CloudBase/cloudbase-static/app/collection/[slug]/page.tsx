import { notFound } from 'next/navigation';
import { listPosts } from '@/lib/posts';
import { collections } from '@/lib/types';
import CollectionView from './view';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const c = collections.find(c => c.slug === slug); return { title: c?.title || '板块未找到', description: c?.description }; }
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const collection = collections.find(c => c.slug === slug); if (!collection) notFound();
 const owner = false;
 try { const posts = (await listPosts(false)).filter(p => p.category === collection.title); return <CollectionView collection={collection} posts={posts} owner={owner} />; }
 catch (error) { console.error(error); return <CollectionView collection={collection} posts={[]} owner={owner} unavailable />; }
}

export function generateStaticParams() { return collections.map(c=>({slug:c.slug})); }
