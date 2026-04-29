import type { HnComment } from '@/lib/hn/types'
import { formatRelativeTime } from '@/lib/hn/derive'
import { Avatar } from './avatar'
import { CommentHtml } from './comment-html'

function truncate(s: string, n: number) {
  if (!s) {
    return ''
  }
  if (s.length <= n) {
    return s
  }
  return `${s.slice(0, n - 1).trimEnd()}…`
}

export function FocalComment({
  comment,
  storyTitle
}: {
  comment: HnComment
  storyTitle: string
}) {
  const author = comment.by ?? '[deleted]'

  return (
    <article className="pb-7 mb-7 border-b border-rule">
      <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
        <Avatar name={author} />
        <div>
          <div className="font-sans text-[15px] font-semibold text-ink">
            @{author}
          </div>
          <div className="font-sans text-[12px] text-ink-3 mt-px">
            {formatRelativeTime(comment.time)} ago · on{' '}
            <em className="italic text-ink-3">{truncate(storyTitle, 50)}</em>
          </div>
        </div>
      </div>

      <div className="font-serif text-[17px] sm:text-[19px] leading-[1.6] text-ink mb-4">
        {comment.text ? (
          <CommentHtml html={comment.text} />
        ) : (
          <span className="text-ink-4 italic">[deleted]</span>
        )}
      </div>
    </article>
  )
}
