import Link from 'next/link'
import type { HnComment } from '@/lib/hn/types'
import { formatRelativeTime } from '@/lib/hn/derive'
import { CommentHtml } from './comment-html'

export function ReplyCard({
  comment,
  storyId
}: {
  comment: HnComment
  storyId: number
}) {
  const author = comment.by ?? '[deleted]'
  const replyCount = comment.kids?.length ?? 0

  return (
    <div className="py-5 border-b border-rule-2 last:border-b-0">
      <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-2 font-sans text-[12px]">
        <div className="font-semibold text-ink text-[13px]">@{author}</div>
        <span className="text-ink-4">·</span>
        <div className="text-ink-4">{formatRelativeTime(comment.time)} ago</div>
      </div>

      <div className="text-[15.5px] sm:text-[16px] mb-3">
        {comment.text ? (
          <CommentHtml html={comment.text} />
        ) : (
          <span className="italic text-ink-4 font-serif">[deleted]</span>
        )}
      </div>

      <Link
        href={`/item/${storyId}/c/${comment.id}`}
        className="font-sans text-[12px] text-accent-ink inline-flex items-center gap-1.5 hover:underline"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path
            d="M3 4 V9 Q3 11 5 11 H12 M9 8 L12 11 L9 14"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          {replyCount > 0
            ? `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'} in thread`
            : 'view comment'}
        </span>
      </Link>
    </div>
  )
}
