'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { trackThemeToggle } from '@/lib/analytics';

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // Render a same-size skeleton to prevent layout shift before mount
  if (!mounted) {
    return (
      <div
        className='inline-flex min-h-11 items-center gap-2 rounded border border-border bg-card px-3 py-2 opacity-0 select-none shadow-sm dark:shadow-none'
        aria-hidden='true'
      >
        <span className='h-3 w-3' />
        <span className='text-[10px] font-mono uppercase tracking-widest'>
          Dark
        </span>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type='button'
      onClick={() => {
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        trackThemeToggle(next);
      }}
      className='inline-flex min-h-11 items-center justify-center gap-2 rounded border border-border bg-card px-3 py-2 text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-px hover:border-accent/40 hover:text-accent hover:shadow-md dark:shadow-none dark:hover:shadow-none cursor-pointer'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className='h-3 w-3' aria-hidden='true' />
      ) : (
        <Moon className='h-3 w-3' aria-hidden='true' />
      )}
      <span className='text-[10px] font-mono uppercase tracking-widest'>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
