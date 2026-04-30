import type { AncestorComment } from '@/lib/hn/types'
import { formatRelativeTime, stripTags } from '@/lib/hn/derive'

function preview(text: string): string {
  const plain = stripTags(text)
  return plain.length > 180 ? `${plain.slice(0, 179).trimEnd()}…` : plain
}

export function Ancestors({
  ancestors,
  storyId
}: {
  ancestors: AncestorComment[]
  storyId: number
}) {
  if (ancestors.length === 0) {
    return null
  }
  return (
    <div className="mb-6 sm:mb-7">
      <div className="font-sans text-[10px] text-ink-4 tracking-[0.16em] uppercase mb-3">
        Thread
      </div>
      {ancestors.map((a) => (
        <a
          key={a.id}
          href={`/item/${storyId}/c/${a.id}`}
          className="block mb-3 last:mb-3 group"
        >
          <div className="font-sans text-[11px] text-ink-4 mb-0.5 tracking-[0.02em]">
            <span className="text-ink-3 font-medium group-hover:text-ink transition-colors">
              @{a.by}
            </span>
            <span className="ml-1">· {formatRelativeTime(a.time)} ago</span>
          </div>
          <div className="font-serif text-[14px] text-ink-3 leading-[1.5] group-hover:text-ink-2 transition-colors">
            {preview(a.text)}
          </div>
        </a>
      ))}
      <div className="font-sans text-[10px] text-ink-4 tracking-[0.16em] uppercase mt-2">
        ↳ Replying to
      </div>
    </div>
  )
}
