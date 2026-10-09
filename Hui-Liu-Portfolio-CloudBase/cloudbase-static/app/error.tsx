'use client';
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <main className="login-card"><h1>暂时无法打开这一页</h1><p>请稍后重试。已保存的文章仍然保留。</p><button className="button primary" onClick={reset}>重试</button></main>;}
