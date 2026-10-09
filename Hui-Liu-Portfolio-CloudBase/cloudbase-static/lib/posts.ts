import records from '@/data/posts.json';
import { normalizeCategory, normalizeTopic, type Post } from './types';
export async function listPosts(_admin=false): Promise<Post[]> {
 return records.map(p=>({...p,category:normalizeCategory(p.category),topic:normalizeTopic(normalizeCategory(p.category),p.topic)} as Post)).sort((a,b)=>(b.publishedAt||b.createdAt).localeCompare(a.publishedAt||a.createdAt));
}
export async function getPost(id:string,_admin=false) {return (await listPosts()).find(p=>p.id===id)||null;}
