import { awardImageSource } from "@/lib/award-image";
import { Fragment, type ReactNode } from 'react';
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((s,i) => {
    if (s.startsWith('**') && s.endsWith('**')) return <strong key={i}>{s.slice(2,-2)}</strong>;
    if (s.startsWith('`') && s.endsWith('`')) return <code key={i}>{s.slice(1,-1)}</code>;
    const link=s.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/); if(link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    return s;
  });
}
export default function Markdown({ content }: { content: string }) {
  const lines=content.replace(/\r\n/g,'\n').split('\n'); const nodes: ReactNode[]=[]; let i=0;
  while(i<lines.length) {
    const line=lines[i]; if(!line.trim()){i++;continue;}
    const image=line.match(/^!\[([^\]]*)\]\((\/(?!\/)[^\s)]+|https?:\/\/[^\s)]+)\)$/); if(image){nodes.push(<figure key={i}><a href={awardImageSource(image[2])} target="_blank" rel="noopener noreferrer"><img src={awardImageSource(image[2])} alt={image[1]} loading="lazy" style={{width:'100%',height:'auto',borderRadius:12}} /></a><figcaption>{image[1]}</figcaption></figure>);i++;continue;}
    if(line.startsWith('```')) {const code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);i++;nodes.push(<pre key={i}><code>{code.join('\n')}</code></pre>);continue;}
    const heading=line.match(/^(#{1,6})\s+(.+)$/); if(heading){const text=inline(heading[2]);nodes.push(heading[1].length<=2?<h2 key={i}>{text}</h2>:heading[1].length===3?<h3 key={i}>{text}</h3>:<h4 key={i}>{text}</h4>);i++;continue;}
    if(/^---+$/.test(line.trim())){nodes.push(<hr key={i}/>);i++;continue;}
    if(/^>\s?/.test(line)){const quotes=[];while(i<lines.length&&/^>\s?/.test(lines[i]))quotes.push(lines[i++].replace(/^>\s?/,''));nodes.push(<blockquote key={i}>{quotes.map((q,j)=><Fragment key={j}>{inline(q)}<br/></Fragment>)}</blockquote>);continue;}
    if(/^[-*]\s+/.test(line)||/^\d+\.\s+/.test(line)){const ordered=/^\d+\./.test(line);const re=ordered?/^\d+\.\s+/:/^[-*]\s+/;const items=[];while(i<lines.length&&re.test(lines[i])){items.push(<li key={i}>{inline(lines[i++].replace(re,''))}</li>);}nodes.push(ordered?<ol key={i}>{items}</ol>:<ul key={i}>{items}</ul>);continue;}
    const paragraph=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(#{1,6}\s|```|>\s?|[-*]\s|\d+\.\s|---+$)/.test(lines[i]))paragraph.push(lines[i++]);nodes.push(<p key={i}>{inline(paragraph.join('\n'))}</p>);
  }
  return <div className="prose">{nodes}</div>;
}
