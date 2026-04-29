import Link from 'next/link'
import type { HnComment } from '@/lib/hn/types'
import { formatRelativeTime, stripTags } from '@/lib/hn/derive'
import { Avatar } from './avatar'

export function ReplyCard({
  comment,
  storyId
}: {
  comment: HnComment
  storyId: number
}) {
  const author = comment.by ?? '[deleted]'
  const text = stripTags(comment.text ?? '')
  const replyCount = comment.kids?.length ?? 0

  return (
    <Link
      href={`/item/${storyId}/c/${comment.id}`}
      className="block w-full text-left py-5 border-b border-rule-2 last:border-b-0 group"
      prefetch={false}
    >
      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 sm:gap-2.5 mb-2.5 sm:mb-2 font-sans text-[12px]">
        <Avatar
          name={author}
          size="sm"
        />
        <div className="font-semibold text-ink text-[13px] group-hover:text-accent-ink transition-colors">
          @{author}
        </div>
        <div className="text-ink-4">{formatRelativeTime(comment.time)} ago</div>
      </div>

      <div className="font-serif text-[15.5px] sm:text-[16px] leading-[1.55] text-ink-2 mb-2.5 line-clamp-5 sm:line-clamp-4 [text-wrap:pretty]">
        {text || <span className="italic text-ink-4">[deleted]</span>}
      </div>

      <div className="font-sans text-[12px] text-accent-ink">
        {replyCount > 0 ? (
          <span className="inline-flex items-center gap-1.5">
            <svg
              viewBox="0 0 16 16"
              width="12"
              height="12"
              aria-hidden="true"
            >
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
              {replyCount} {replyCount === 1 ? 'reply' : 'replies'} in thread
            </span>
          </span>
        ) : (
          <span className="text-ink-4">no replies</span>
        )}
      </div>
    </Link>
  )
}
