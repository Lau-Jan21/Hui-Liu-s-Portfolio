export const categories = ['科研竞赛', '社会实践', '知识沉淀', '日常随笔'] as const;
export type Category = typeof categories[number];
export const collections = [
 { slug: 'research', title: '科研竞赛', number: '01', description: '科研经历、项目落地与竞赛成果', topics: ['比赛奖项', '科研经历', '项目落地'], note: '研究、项目与竞赛记录' },
 { slug: 'practice', title: '社会实践', number: '02', description: '学生工作、志愿服务与自媒体', topics: ['学生工作', '志愿服务', '自媒体'], note: '协作、服务与传播记录' },
 { slug: 'knowledge', title: '知识沉淀', number: '03', description: '学习笔记与经验干货', topics: ['学习笔记', '经验干货'], note: '代码、学习与教程记录' },
 { slug: 'journal', title: '日常随笔', number: '04', description: '生活经历与成长感悟', topics: [], note: '日常随笔记录' },
] as const;
export type Collection = typeof collections[number];
export function collectionFor(category: string) { return collections.find(c => c.title === category); }
export function normalizeCategory(category: string): Category { return category === '个人感想' ? '日常随笔' : category === '学习经验' ? '知识沉淀' : category as Category; }
export type Post = { id: string; title: string; excerpt: string; content: string; category: Category; topic: string; tags: string[]; status: 'draft' | 'published'; createdAt: string; updatedAt: string; publishedAt: string | null; sourceName: string | null; version: number };
export type Profile = { name: string; tagline: string; identity: string; bio: string; education: string; resume: string; academic: string; gpa: string; skills: string; courses: string; heroTitle: string; heroDescription: string; email: string; phone: string; github: string; xiaohongshu: string; douyin: string; wechat: string; qq: string; blog: string; version: number };
export const defaultProfile: Profile = { name: '刘慧', tagline: '在探索中学习，在记录中成长。', identity: '', bio: '', education: '', resume: '', academic: '', gpa: '3.4', skills: 'Python, MATLAB, C, C++, PyTorch, SolidWorks, CAD, Zemax', courses: '应用光学, 数字电路基础, 电路基础分析, 高等数学, 概率论, 线性代数', heroTitle: '光电信息科学与工程', heroDescription: "用公式解析物理世界，用文字记录真实生活。\n这里记录我的技术探索和项目经历，也存放生活里的日常随笔。\n欢迎来到独属于我的数字星球(*^o^*) ~", email: '', phone: '', github: '', xiaohongshu: '', douyin: '', wechat: '', qq: '', blog: '', version: 0 };
export function formatDate(value: string) { return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai' }).format(new Date(value)).replaceAll('/', '.'); }
export function readingTime(value: string) { return Math.max(1, Math.ceil(value.replace(/\s/g, '').length / 450)); }

export function normalizeTopic(category: string, topic: string): string {
 if (category === "知识沉淀") return topic === "代码笔记" ? "学习笔记" : ["硬核干货", "经验教程"].includes(topic) ? "经验干货" : topic;
 if (category === "社会实践" && topic === "自媒体影响") return "自媒体";
 if (category !== "科研竞赛") return topic;
 return topic === "研究经历" ? "科研经历" : topic === "工程落地" ? "项目落地" : topic;
}
