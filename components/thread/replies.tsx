import type { HnComment } from '@/lib/hn/types'
import { ReplyCard } from './reply-card'

function isLiveComment(c: HnComment | null | undefined): c is HnComment {
  if (!c) {
    return false
  }
  if (c.deleted) {
    return false
  }
  if (c.dead) {
    return false
  }
  return true
}

export function Replies({
  storyId,
  comments
}: {
  storyId: number
  comments: Array<HnComment | null>
}) {
  const live = comments.filter(isLiveComment)
  return (
    <div>
      <div className="font-sans text-[11px] uppercase tracking-[0.08em] text-ink-4 mb-3 sm:mb-3.5">
        {live.length === 0
          ? 'no replies yet'
          : `${live.length} ${live.length === 1 ? 'reply' : 'replies'}`}
      </div>
      {live.map((c) => (
        <ReplyCard
          key={c.id}
          comment={c}
          storyId={storyId}
        />
      ))}
    </div>
  )
}
