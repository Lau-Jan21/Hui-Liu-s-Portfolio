import { listPosts } from '@/lib/posts';
import { getProfile } from '@/lib/profile';
import { defaultProfile } from '@/lib/types';
import Journal from './journal';

export default async function Home() {
 const owner = false;
 try { const [posts, profile] = await Promise.all([listPosts(false), getProfile()]); return <Journal posts={posts} profile={profile} owner={owner} />; }
 catch (error) { console.error('Portfolio unavailable', error); return <Journal posts={[]} profile={defaultProfile} owner={owner} unavailable />; }
}
