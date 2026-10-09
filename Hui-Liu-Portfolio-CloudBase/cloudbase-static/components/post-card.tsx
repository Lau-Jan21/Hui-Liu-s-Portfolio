import { formatDate, type Post } from '@/lib/types';
import AwardCard from './award-card';
import StudentWorkCard from './student-work-card';
export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
 if (post.category === '社会实践' && post.topic === '学生工作') return <StudentWorkCard post={post} />;
 if (post.topic === '比赛奖项' || (post.category === '社会实践' && post.topic === '志愿服务')) return <AwardCard post={post} />;
 const photos = post.category === '社会实践' && post.topic === '志愿服务' ? [...post.content.matchAll(/!\[([^\]]*)\]\((\/[^\s)]+)\)/g)].map(match => ({ alt: match[1], src: match[2] })) : [];
 return <a className="post-card" href={`/posts/${post.id}`}><span className="post-index mono">{String(index + 1).padStart(2, '0')}</span><div className="post-card-main"><div className="post-meta"><span className="category-badge">{post.topic || post.category}</span><time>{formatDate(post.publishedAt || post.createdAt)}</time></div><h3>{post.title}</h3>{post.excerpt && <p>{post.excerpt}</p>}{photos.length > 0 && <div className="practice-photo-grid">{photos.map(photo => <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />)}</div>}<div className="post-bottom"><div className="tags">{post.tags.map(t => <span key={t}>#{t}</span>)}</div></div></div><span className="post-read">阅读</span></a>;
}
