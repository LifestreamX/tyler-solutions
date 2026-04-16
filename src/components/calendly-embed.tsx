'use client';

import { useEffect, useRef, useState } from 'react';
import {
  trackScheduleBooked,
  trackScheduleDateTimeSelected,
  trackScheduleEventTypeView,
  trackScheduleWidgetView,
} from '@/lib/analytics';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const CALENDLY_SCRIPT_SRC =
  'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_ORIGIN = 'https://calendly.com';

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Calendly embed script.')),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('Failed to load Calendly embed script.'));
    document.head.append(script);
  });

  return calendlyScriptPromise;
}

function isCalendlyMessage(
  event: MessageEvent,
): event is MessageEvent<{ event?: string; payload?: unknown }> {
  return (
    event.origin === CALENDLY_ORIGIN &&
    typeof event.data === 'object' &&
    event.data !== null &&
    typeof (event.data as { event?: unknown }).event === 'string' &&
    (event.data as { event: string }).event.startsWith('calendly.')
  );
}

export function CalendlyEmbed({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seenEvents = useRef(new Set<string>());
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    async function initCalendlyEmbed() {
      try {
        await loadCalendlyScript();

        if (cancelled || !window.Calendly || !container) {
          return;
        }

        container.innerHTML = '';
        window.Calendly.initInlineWidget({
          url,
          parentElement: container,
        });
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    }

    void initCalendlyEmbed();

    return () => {
      cancelled = true;

      if (container) {
        container.innerHTML = '';
      }
    };
  }, [url]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!isCalendlyMessage(event)) {
        return;
      }

      switch (event.data.event) {
        case 'calendly.profile_page_viewed':
          if (seenEvents.current.has(event.data.event)) {
            return;
          }

          seenEvents.current.add(event.data.event);
          trackScheduleWidgetView();
          return;

        case 'calendly.event_type_viewed':
          if (seenEvents.current.has(event.data.event)) {
            return;
          }

          seenEvents.current.add(event.data.event);
          trackScheduleEventTypeView();
          return;

        case 'calendly.date_and_time_selected':
          if (seenEvents.current.has(event.data.event)) {
            return;
          }

          seenEvents.current.add(event.data.event);
          trackScheduleDateTimeSelected();
          return;

        case 'calendly.event_scheduled':
          trackScheduleBooked(event.data.payload);
          return;

        default:
          return;
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (failed) {
    return (
      <div className='flex min-h-175 items-center justify-center p-6 text-center sm:min-h-190'>
        <p className='max-w-sm text-sm leading-relaxed text-muted-foreground'>
          The embedded calendar could not load here. Use the full calendar link
          above to book a time directly.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label={title}
      className='min-h-175 w-full sm:min-h-190'
    />
  );
}
