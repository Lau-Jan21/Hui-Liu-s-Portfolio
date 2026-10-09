import { ChevronRight } from 'lucide-react';
import { type Post } from '@/lib/types';
export default function StudentWorkCard({post}: {post: Post}) {
 const organization = post.content.match(/^- 单位：(.+)$/m)?.[1] || post.excerpt;
 const period = post.content.match(/^- 任职时间：(.+)$/m)?.[1];
 return <a className="student-work-card" href={`/posts/${post.id}`}><span className="student-work-node" aria-hidden="true" /><div className="student-work-main"><h3>{organization}</h3><p>{post.title}</p>{period && <span className="student-work-period">{period}</span>}</div><ChevronRight className="student-work-arrow" size={20} aria-hidden="true" /></a>;
}
