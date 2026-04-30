import type { HnStory } from '@/lib/hn/types'
import { formatRelativeTime, getDomain } from '@/lib/hn/derive'
import { CommentHtml } from './comment-html'

export function FocalStory({ story }: { story: HnStory }) {
  const domain = getDomain(story.url)
  const points = story.score ?? 0
  const comments = story.descendants ?? 0
  const author = story.by ?? '[deleted]'

  return (
    <article className="pb-7 mb-7 border-b border-rule">
      <h1 className="font-serif text-[24px] sm:text-[32px] leading-[1.22] sm:leading-[1.2] font-semibold tracking-[-0.015em] mb-3.5 [text-wrap:balance]">
        {story.title}
      </h1>

      {story.url && domain && (
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] text-accent-ink mb-4 border-b border-transparent hover:border-accent-ink pb-px transition-colors"
        >
          {domain}
          <svg
            viewBox="0 0 12 12"
            width="10"
            height="10"
            aria-hidden="true"
          >
            <path
              d="M4 2 H10 V8 M10 2 L3 9"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </a>
      )}

      {story.text && (
        <div className="font-serif text-[17px] sm:text-[18px] leading-[1.6] text-ink mb-4">
          <CommentHtml html={story.text} />
        </div>
      )}

      <div className="flex items-center gap-x-2 gap-y-1.5 sm:gap-2.5 flex-wrap font-sans text-[12px] text-ink-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-sunk font-medium text-ink-2 tabular-nums"
          aria-label={`${points} points`}
        >
          <svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
          >
            <path
              d="M8 3 L13 11 L3 11 Z"
              fill="currentColor"
            />
          </svg>
          <span>
            {points} <span className="text-ink-3 font-normal">points</span>
          </span>
        </span>
        <Sep />
        <span>
          posted by{' '}
          <strong className="text-ink-2 font-medium">@{author}</strong>
        </span>
        <Sep />
        <span>{formatRelativeTime(story.time)} ago</span>
        <Sep />
        <span>{comments} replies</span>
      </div>
    </article>
  )
}

function Sep() {
  return <span className="text-ink-4">·</span>
}
