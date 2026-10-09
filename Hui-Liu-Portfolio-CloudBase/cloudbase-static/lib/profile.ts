import savedProfile from '@/data/profile.json';
import {defaultProfile,type Profile} from './types';
export async function getProfile(): Promise<Profile> {
 const profile: Profile = {...defaultProfile,...savedProfile};
 profile.heroTitle = profile.heroTitle.replace(/\s*[|｜·]?\s*本科生/g, '').trim();
 if (["用公式解析物理世界，用文字记录真实生活。\n专业学习日常与代码公式和硬件打交道；\n屏幕之外，是一个爱好广泛，什么都想体验一下的行动派。\n这里收录我的技术探索和项目经历，也存放生活里的日常随笔。\n欢迎来到独属于我的数字星球(*^o^*)", "专注于 AI 成像与光通信技术的工程实践，具有扎实的编程基础与硬件开发能力。", "用公式解析物理世界，用文字记录真实生活。专业学习日常与代码公式和硬件打交道；屏幕之外，是一个爱好广泛，什么都想体验一下的行动派。\n这里收录我的技术探索和项目经历，也存放生活里的日常随笔。欢迎来到独属于我的数字星球(*^o^*)", "用公式解析物理世界，用文字记录真实生活。\n专业学习日常与代码公式和硬件打交道；屏幕之外，是一个爱好广泛，什么都想体验一下的行动派。\n这里收录我的技术探索和项目经历，也存放生活里的日常随笔。\n欢迎来到独属于我的数字星球(*^o^*)"].includes(profile.heroDescription)) profile.heroDescription = defaultProfile.heroDescription;
 // Earlier single-line editor values used spaces where the introduction needs breaks.
 const compact = (text: string) => text.replace(/\s/g, '').replace(/[~～]$/, '');
 if (compact(profile.heroDescription) === compact(defaultProfile.heroDescription)) profile.heroDescription = defaultProfile.heroDescription;
 return profile;
}
