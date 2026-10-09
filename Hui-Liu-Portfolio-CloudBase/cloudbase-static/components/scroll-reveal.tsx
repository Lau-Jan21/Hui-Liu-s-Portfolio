'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, direction = 'up', delay = 0, waitForScroll = false, stagger = false, className = '' }: { children: React.ReactNode; direction?: 'up' | 'left' | 'right'; delay?: number; waitForScroll?: boolean; stagger?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already visible cards stay readable; lower cards reveal once as they enter.
    const bounds = element.getBoundingClientRect();
    if (!waitForScroll && bounds.top < window.innerHeight && bounds.bottom > 0) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: waitForScroll ? 0.15 : 0, rootMargin: waitForScroll ? '0px 0px -80px 0px' : '0px 0px -24px 0px' });
    element.classList.add('reveal-pending');
    const observe = () => observer.observe(element);
    if (waitForScroll) window.addEventListener('scroll', observe, { passive: true, once: true });
    else observe();
    return () => { window.removeEventListener('scroll', observe); observer.disconnect(); element.classList.remove('reveal-pending', 'is-visible'); };
  }, [waitForScroll]);
  return <div ref={ref} className={`essay-reveal reveal-${direction}${stagger ? ' reveal-stagger' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} onFocusCapture={() => ref.current?.classList.add('is-visible')}>{children}</div>;
}
