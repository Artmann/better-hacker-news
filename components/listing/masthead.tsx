import Link from 'next/link'
import type { StoryKind } from '@/lib/hn/types'
import { ThemeToggle } from '@/components/theme-toggle'

const TABS: Array<{ kind: StoryKind; href: string; label: string }> = [
  { kind: 'top', href: '/', label: 'top' },
  { kind: 'new', href: '/new', label: 'new' },
  { kind: 'ask', href: '/ask', label: 'ask' },
  { kind: 'show', href: '/show', label: 'show' }
]

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatToday() {
  const now = new Date()
  return `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`
}

export function Masthead({ active }: { active: StoryKind }) {
  return (
    <header className="pt-9 sm:pt-14 pb-[18px] sm:pb-6 border-b border-rule">
      <div className="flex items-baseline justify-between gap-6 mb-[22px] sm:mb-7">
        <h1 className="font-serif text-[22px] sm:text-[32px] font-semibold tracking-[-0.02em] flex items-baseline gap-2 sm:gap-3">
          <span className="text-ink">Ember</span>
          <span className="text-accent font-normal">·</span>
          <span className="hidden sm:inline font-sans text-[12px] font-normal text-ink-3 lowercase">
            a reader for hackers
          </span>
        </h1>
        <div className="font-sans text-[11px] sm:text-[12px] text-ink-3 uppercase tracking-[0.04em]">
          {formatToday()}
        </div>
      </div>

      <nav className="flex gap-0.5 sm:gap-1 items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const isActive = tab.kind === active
          return (
            <Link
              key={tab.kind}
              href={tab.href}
              className={`font-sans text-[13px] font-medium px-3 sm:px-3.5 py-[7px] sm:py-2 rounded-full lowercase tracking-[0.02em] transition-colors flex-shrink-0 ${
                isActive
                  ? 'text-ink bg-bg-sunk'
                  : 'text-ink-3 hover:text-ink hover:bg-bg-sunk'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
        <div className="flex-1" />
        <ThemeToggle />
      </nav>
    </header>
  )
}
