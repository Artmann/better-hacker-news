import Link from 'next/link'
import type { StoryKind } from '@/lib/hn/types'
import { ThemeToggle } from '@/components/theme-toggle'

const TABS: Array<{ kind: StoryKind; href: string; label: string }> = [
  { kind: 'top', href: '/', label: 'Top' },
  { kind: 'new', href: '/new', label: 'New' },
  { kind: 'ask', href: '/ask', label: 'Ask' },
  { kind: 'show', href: '/show', label: 'Show' }
]

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function formatToday(): { date: string; edition: string } {
  const now = new Date()
  const date = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`
  const start = new Date(2007, 1, 19).getTime()
  const days = Math.floor((now.getTime() - start) / 86_400_000)
  const edition = `№${String(days).padStart(5, '0')}`
  return { date, edition }
}

export function Masthead({ active }: { active: StoryKind }) {
  const { date, edition } = formatToday()

  return (
    <header className="pt-10 sm:pt-16 pb-4 sm:pb-6">
      <div className="flex items-baseline justify-between gap-3 font-sans text-[10px] sm:text-[11px] text-ink-4 uppercase tracking-[0.16em] mb-3 sm:mb-4">
        <span>{edition}</span>
        <span>{date}</span>
      </div>

      <h1 className="font-serif text-[34px] sm:text-[52px] leading-[0.95] font-semibold tracking-[-0.025em] text-ink mb-1.5 [text-wrap:balance]">
        Better Hacker News
      </h1>

      <p className="font-serif italic text-[14px] sm:text-[15px] text-ink-3 mb-7 sm:mb-8 [text-wrap:balance]">
        A calmer reading of news.ycombinator.com.
      </p>

      <div className="border-y border-rule">
        <nav className="flex gap-1 sm:gap-2 items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1.5">
          {TABS.map((tab) => {
            const isActive = tab.kind === active
            return (
              <Link
                key={tab.kind}
                href={tab.href}
                className={`font-sans text-[12px] sm:text-[13px] font-medium px-2 sm:px-2.5 py-1 uppercase tracking-[0.06em] transition-colors flex-shrink-0 ${
                  isActive
                    ? 'text-accent-ink'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
          <div className="flex-1" />
          <Link
            href="/about"
            className="font-sans text-[12px] sm:text-[13px] font-medium px-2 sm:px-2.5 py-1 uppercase tracking-[0.06em] transition-colors flex-shrink-0 text-ink-3 hover:text-ink"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
