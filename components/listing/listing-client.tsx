'use client'

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'bhn-seen'
const MAX_SEEN = 500

function loadSeen(): Set<number> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return new Set()
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return new Set()
    }
    return new Set(parsed.filter((v) => typeof v === 'number'))
  } catch {
    return new Set()
  }
}

function saveSeen(seen: Set<number>) {
  try {
    const arr = Array.from(seen).slice(-MAX_SEEN)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
  } catch {}
}

function rows(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>('[data-story-row]')
  )
}

function setFocused(index: number) {
  const list = rows()
  list.forEach((el, i) => {
    el.dataset.focused = i === index ? 'true' : 'false'
  })
  const target = list[index]
  if (target) {
    const rect = target.getBoundingClientRect()
    if (rect.top < 80 || rect.bottom > window.innerHeight - 40) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }
}

function markSeenForRow(el: HTMLElement, seen: Set<number>) {
  const id = Number(el.dataset.storyId)
  if (!Number.isFinite(id)) {
    return
  }
  if (!seen.has(id)) {
    seen.add(id)
    saveSeen(seen)
  }
  el.dataset.seen = 'true'
}

export function ListingClient() {
  const [helpOpen, setHelpOpen] = useState(false)
  const focusIndex = useRef<number>(-1)
  const lastG = useRef<number>(0)
  const seenRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    seenRef.current = loadSeen()
    rows().forEach((el) => {
      const id = Number(el.dataset.storyId)
      if (Number.isFinite(id) && seenRef.current.has(id)) {
        el.dataset.seen = 'true'
      }
    })
  }, [])

  useEffect(() => {
    function isTyping(): boolean {
      const t = document.activeElement
      if (!t) {
        return false
      }
      const tag = t.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        return true
      }
      if ((t as HTMLElement).isContentEditable) {
        return true
      }
      return false
    }

    function move(delta: number) {
      const list = rows()
      if (list.length === 0) {
        return
      }
      const next = Math.max(
        0,
        Math.min(list.length - 1, (focusIndex.current < 0 ? -1 : focusIndex.current) + delta)
      )
      focusIndex.current = next
      setFocused(next)
    }

    function open() {
      const list = rows()
      const el = list[focusIndex.current]
      if (!el) {
        return
      }
      const link = el.querySelector<HTMLAnchorElement>('a[data-story-link]')
      const externalUrl = el.dataset.storyUrl
      markSeenForRow(el, seenRef.current)
      if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener,noreferrer')
        return
      }
      link?.click()
    }

    function openComments() {
      const list = rows()
      const el = list[focusIndex.current]
      if (!el) {
        return
      }
      const link = el.querySelector<HTMLAnchorElement>('a[data-story-comments]')
      markSeenForRow(el, seenRef.current)
      link?.click()
    }

    function onKey(e: KeyboardEvent) {
      if (isTyping()) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return
      }
      const k = e.key
      if (k === 'j' || k === 'J') {
        e.preventDefault()
        move(focusIndex.current < 0 ? 1 : 1)
        if (focusIndex.current < 0) {
          focusIndex.current = 0
          setFocused(0)
        }
        return
      }
      if (k === 'k' || k === 'K') {
        e.preventDefault()
        move(-1)
        return
      }
      if (k === 'o' || k === 'Enter') {
        e.preventDefault()
        open()
        return
      }
      if (k === 'c' || k === 'C') {
        e.preventDefault()
        openComments()
        return
      }
      if (k === 'g') {
        const now = Date.now()
        if (now - lastG.current < 600) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          lastG.current = 0
          focusIndex.current = -1
          rows().forEach((el) => (el.dataset.focused = 'false'))
          return
        }
        lastG.current = now
        return
      }
      if (k === 'G') {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        return
      }
      if (k === '?') {
        e.preventDefault()
        setHelpOpen((v) => !v)
        return
      }
      if (k === 'Escape') {
        setHelpOpen(false)
      }
    }

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[data-story-link], a[data-story-comments]'
      )
      if (!target) {
        return
      }
      const row = target.closest<HTMLElement>('[data-story-row]')
      if (row) {
        markSeenForRow(row, seenRef.current)
      }
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick, true)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden={!helpOpen}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-200 ${
          helpOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-bg-elev border border-rule rounded-lg shadow-card p-4 font-sans text-[12px] text-ink-2 min-w-[240px]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-4 mb-2.5">
            Keyboard
          </div>
          <ul className="space-y-1.5">
            <Shortcut keys="j / k" label="next / previous" />
            <Shortcut keys="o ↵" label="open story" />
            <Shortcut keys="c" label="open comments" />
            <Shortcut keys="g g" label="back to top" />
            <Shortcut keys="G" label="jump to bottom" />
            <Shortcut keys="?" label="toggle this panel" />
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setHelpOpen((v) => !v)}
        aria-label="Keyboard shortcuts"
        className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-full bg-bg-elev border border-rule shadow-card font-sans text-[13px] text-ink-3 hover:text-ink transition-colors"
      >
        ?
      </button>
    </>
  )
}

function Shortcut({ keys, label }: { keys: string; label: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] text-ink-3">{keys}</span>
      <span className="text-ink-3">{label}</span>
    </li>
  )
}
