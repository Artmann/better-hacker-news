import Link from 'next/link'

export interface CrumbItem {
  label: string
  href?: string
}

function truncate(s: string, n: number) {
  if (!s) {
    return ''
  }
  if (s.length <= n) {
    return s
  }
  return `${s.slice(0, n - 1).trimEnd()}…`
}

export function ThreadBar({ crumbs }: { crumbs: CrumbItem[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap items-stretch gap-3 sm:gap-4 pb-4 sm:pb-5 mb-[22px] sm:mb-6 border-b border-rule">
      <Link
        href="/"
        className="self-start inline-flex items-center gap-1.5 font-sans text-[12px] text-ink-3 hover:text-ink hover:bg-bg-sunk px-2.5 py-1.5 rounded transition tracking-[0.02em]"
      >
        <svg
          viewBox="0 0 16 16"
          width="12"
          height="12"
          aria-hidden="true"
        >
          <path
            d="M10 3 L5 8 L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>all stories</span>
      </Link>

      {crumbs.length > 0 && (
        <div className="flex items-center gap-1.5 font-sans text-[12px] text-ink-4 flex-wrap">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            const label = truncate(crumb.label, 30)
            return (
              <span
                key={`${crumb.label}-${i}`}
                className="inline-flex items-center gap-1.5"
              >
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-ink-3 hover:text-ink hover:bg-bg-sunk px-2 py-1 rounded max-w-[180px] sm:max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    className={`px-2 py-1 rounded max-w-[180px] sm:max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap ${
                      isLast ? 'text-ink' : 'text-ink-3'
                    }`}
                  >
                    {label}
                  </span>
                )}
                {!isLast && <span className="text-ink-4">›</span>}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
