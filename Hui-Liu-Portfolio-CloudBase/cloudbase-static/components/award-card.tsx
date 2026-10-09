import { awardImageSource } from "@/lib/award-image";
import { ArrowUpRight } from 'lucide-react';
import { formatDate, type Post } from '@/lib/types';
export default function AwardCard({ post }: { post: Post }) {
  const volunteer = post.category === '社会实践' && post.topic === '志愿服务';
  const photos = volunteer ? [...post.content.matchAll(/!\[([^\]]*)\]\((\/[^\s)]+)\)/g)] : [];
  const coverPhotos = photos.length ? [photos.find(photo => photo[2] === '/practice/national-games-scene.jpg') || photos[0]] : [];
  const serviceYear = volunteer ? post.content.match(/^- 时间：(\d{4})年/m)?.[1] : undefined;
  const image = post.content.match(/^!\[([^\]]*)\]\((\/awards\/[^\s)]+|https?:\/\/[^\s)]+)\)$/m);
  const month = post.content.match(/^- 获奖时间：(\d{4})年(\d{1,2})月\s*$/m);
  const awardDate = serviceYear || (month ? `${month[1]}.${month[2].padStart(2, '0')}` : formatDate(post.publishedAt || post.createdAt));
  const dateTime = serviceYear || (month ? `${month[1]}-${month[2].padStart(2, '0')}` : post.publishedAt || post.createdAt);
  return <a className="award-card" href={`/posts/${post.id}`}>
    <header><h3>{post.title}</h3><p className="award-date"><time aria-label={`${volunteer ? '服务时间' : '获奖时间'}：${awardDate}`} dateTime={dateTime}>{awardDate}</time></p></header>
    {volunteer && coverPhotos.length > 0 && <div className="volunteer-gallery">{coverPhotos.map(photo => <div className="award-image" key={photo[2]}><img src={photo[2]} alt={photo[1]} loading="lazy" /></div>)}</div>}
    {!volunteer && image && <div className="award-image"><img src={awardImageSource(image[2])} alt={image[1]} loading="lazy" /></div>}
    <p className="award-description">{post.excerpt}</p>
    <div className="award-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <span className="award-action">{volunteer ? '查看详细' : '查看获奖详情'}<ArrowUpRight size={16} aria-hidden="true" /></span>
  </a>;
}
