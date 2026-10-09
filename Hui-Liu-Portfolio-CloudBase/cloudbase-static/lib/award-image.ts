export function awardImageSource(src: string) {
  return /^\/awards\/(scnu-optoelectronics-2026-first-prize|scnu-innovation-2025-bronze)\.jpg$/.test(src) ? src.replace(/\.jpg$/, ".svg") : src;
}
