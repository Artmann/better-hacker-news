import Link from 'next/link'
import type { HnStory } from '@/lib/hn/types'
import { formatRelativeTime, getDomain, stripTags } from '@/lib/hn/derive'

function snippet(story: HnStory): string | null {
  if (!story.text) {
    return null
  }
  const plain = stripTags(story.text)
  if (plain.length === 0) {
    return null
  }
  return plain.length > 200 ? `${plain.slice(0, 199).trimEnd()}…` : plain
}

function tag(story: HnStory): string | null {
  if (story.type === 'job') {
    return 'job'
  }
  if (!story.url) {
    return 'text'
  }
  return null
}

export function StoryRow({ story, rank }: { story: HnStory; rank: number }) {
  const domain = getDomain(story.url)
  const text = snippet(story)
  const itemTag = tag(story)
  const points = story.score ?? 0
  const comments = story.descendants ?? 0
  const author = story.by ?? '[deleted]'

  return (
    <li
      data-story-row
      data-story-id={story.id}
      data-story-url={story.url ?? ''}
      data-focused="false"
      className="grid grid-cols-[1fr] sm:grid-cols-[28px_1fr] gap-3.5 py-[22px] sm:py-5 border-b border-rule-2 last:border-b-0 items-start data-[focused=true]:bg-bg-sunk/60 data-[seen=true]:opacity-55 transition-[opacity,background-color] duration-150 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded"
    >
      <div className="hidden sm:block font-mono text-[12px] text-ink-4 pt-1.5 tabular-nums">
        {String(rank).padStart(2, '0')}
      </div>

      <div className="block min-w-0">
        <HeaderLink story={story}>
          <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap mb-2 sm:mb-1.5">
            <h2 className="font-serif text-[19px] sm:text-[21px] leading-[1.32] sm:leading-[1.3] font-semibold tracking-[-0.01em] text-ink group-hover:text-accent-ink transition-colors flex-1 [text-wrap:pretty]">
              {story.title}
            </h2>
            {domain && (
              <span
                data-story-domain
                className="inline-flex items-center gap-1 font-sans text-[12px] text-ink-3 whitespace-nowrap"
              >
                {domain}
                <ExternalArrow />
              </span>
            )}
          </div>

          {text && (
            <p className="font-serif text-[15px] text-ink-2 my-1.5 sm:my-1 mb-2.5 sm:mb-2 leading-[1.55] line-clamp-3 [text-wrap:pretty]">
              {text}
            </p>
          )}
        </HeaderLink>

        <div className="flex items-center gap-x-2 gap-y-1 sm:gap-2 flex-wrap font-sans text-[12px] text-ink-3 mt-2 sm:mt-1.5">
          <span className="tabular-nums">{points} points</span>
          <Sep />
          <span className="text-ink-2 font-medium">@{author}</span>
          <Sep />
          <span>{formatRelativeTime(story.time)} ago</span>
          <Sep />
          <Link
            href={`/item/${story.id}`}
            data-story-comments
            className="tabular-nums hover:text-ink-2 transition-colors"
          >
            {comments} replies
          </Link>
          {itemTag && (
            <span className="ml-1 inline-block px-1.5 py-px rounded-[3px] bg-bg-sunk text-[10px] uppercase tracking-[0.08em] text-ink-3">
              {itemTag}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}

function Sep() {
  return <span className="text-ink-4">·</span>
}

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="9"
      height="9"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 2 H10 V8 M10 2 L3 9"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

function HeaderLink({
  story,
  children,
}: {
  story: HnStory
  children: React.ReactNode
}) {
  const className = 'block min-w-0 group'
  if (story.url) {
    return (
      <a
        href={story.url}
        data-story-link
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={`/item/${story.id}`}
      data-story-link
      className={className}
    >
      {children}
    </Link>
  )
}
