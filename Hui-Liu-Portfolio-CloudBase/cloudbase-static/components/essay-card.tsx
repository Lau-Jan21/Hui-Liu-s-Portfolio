import { formatDate, type Post } from '@/lib/types';
import ScrollReveal from '@/components/scroll-reveal';
export default function EssayCard({ post }: { post: Post }) {
 return <ScrollReveal><a className="essay-card" href={`/posts/${post.id}`}><div className="essay-card-heading"><h2>{post.title}</h2><time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time></div>{post.excerpt && <p>{post.excerpt}</p>}<div className="essay-card-bottom"><span>阅读全文 →</span></div></a></ScrollReveal>;
}
