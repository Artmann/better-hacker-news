'use client'

import { useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ember-theme'
const STORAGE_EVENT = 'storage'

function readStoredTheme(): Theme {
  const value = window.localStorage.getItem(STORAGE_KEY)
  if (value === 'dark') {
    return 'dark'
  }
  return 'light'
}

function subscribe(callback: () => void) {
  window.addEventListener(STORAGE_EVENT, callback)
  return () => window.removeEventListener(STORAGE_EVENT, callback)
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    readStoredTheme,
    () => null
  )

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme
    }
  }, [theme])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.dataset.theme = next
    window.dispatchEvent(new StorageEvent(STORAGE_EVENT, { key: STORAGE_KEY }))
  }

  const mounted = theme !== null
  const showDarkLabel = mounted && theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${showDarkLabel ? 'dark' : 'light'} mode`}
      className="font-sans text-[12px] text-ink-3 hover:text-ink hover:bg-bg-sunk transition px-2.5 py-1.5 rounded-full lowercase tracking-[0.02em] inline-flex items-center gap-1.5"
    >
      {mounted && theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span>{mounted ? (showDarkLabel ? 'dark' : 'light') : 'theme'}</span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="3"
        fill="currentColor"
      />
      <path
        d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <path
        d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"
        fill="currentColor"
      />
    </svg>
  )
}
