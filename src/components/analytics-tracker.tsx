'use client';

import { useEffect, useRef } from 'react';
import {
  trackScrollDepth,
  trackSectionView,
  trackTimeOnPage,
  trackOutboundClick,
  trackCaseStudyRead,
} from '@/lib/analytics';

/**
 * AnalyticsTracker mounts once at the app root (client-side only).
 * Handles all passive tracking that requires DOM/browser APIs:
 *   • Scroll depth milestones (25 / 50 / 75 / 90 / 100 %)
 *   • Section visibility (IntersectionObserver on each section)
 *   • Time on page milestones (10s / 30s / 60s / 120s / 300s)
 *   • Case study dwell time (3s visible = "read")
 *   • Automatic outbound link click capture
 */
export function AnalyticsTracker() {
  const scrollMilestonesHit = useRef(new Set<number>());
  const timeMilestonesHit = useRef(new Set<number>());
  const sectionsSeen = useRef(new Set<string>());
  const caseStudiesRead = useRef(new Set<string>());
  const caseStudyTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  // Scroll Depth
  useEffect(() => {
    const milestones = [25, 50, 75, 90, 100];

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (pct >= milestone && !scrollMilestonesHit.current.has(milestone)) {
          scrollMilestonesHit.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    // Throttle with requestAnimationFrame
    let ticking = false;
    function throttledScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Time on Page
  useEffect(() => {
    const milestones = [10, 30, 60, 120, 300]; // seconds
    let activeSeconds = 0;

    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible') return;

      activeSeconds += 1;

      for (const seconds of milestones) {
        if (
          activeSeconds >= seconds &&
          !timeMilestonesHit.current.has(seconds)
        ) {
          timeMilestonesHit.current.add(seconds);
          trackTimeOnPage(seconds);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Section Visibility
  useEffect(() => {
    const sections: Record<string, string> = {
      hero: 'Hero',
      services: 'Services',
      work: 'Recent Work',
      'after-launch': 'Site Review',
      about: 'About',
      stack: 'Capabilities',
      process: 'Process',
      faq: 'FAQ',
      schedule: 'Schedule',
      contact: 'Contact',
    };

    const observers: IntersectionObserver[] = [];

    for (const [id, title] of Object.entries(sections)) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !sectionsSeen.current.has(id)) {
              sectionsSeen.current.add(id);
              trackSectionView(id, title);
            }
          }
        },
        { threshold: 0.3 }, // 30% of section must be visible
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Case Study Dwell Time (3s = "read")
  useEffect(() => {
    const caseStudyEls =
      document.querySelectorAll<HTMLElement>('[data-case-study]');
    const observers: IntersectionObserver[] = [];
    const timers = caseStudyTimers.current;

    for (const el of caseStudyEls) {
      const title = el.getAttribute('data-case-study') ?? 'unknown';

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (caseStudiesRead.current.has(title)) {
                continue;
              }

              // Start 3s dwell timer
              if (!timers.has(title)) {
                const t = setTimeout(() => {
                  caseStudiesRead.current.add(title);
                  trackCaseStudyRead(title);
                  timers.delete(title);
                }, 3000);
                timers.set(title, t);
              }
            } else {
              // Cancel timer if they scroll away
              const t = timers.get(title);
              if (t !== undefined) {
                clearTimeout(t);
                timers.delete(title);
              }
            }
          }
        },
        { threshold: 0.4 },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // Automatic Outbound Link Tracking
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href]',
      );
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      let destination: URL;

      try {
        destination = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin === window.location.origin) {
        return;
      }

      const label =
        target.getAttribute('aria-label') ??
        target.textContent?.trim() ??
        destination.toString();
      trackOutboundClick(destination.toString(), label);
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () =>
      document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // This component renders nothing visible
  return null;
}
