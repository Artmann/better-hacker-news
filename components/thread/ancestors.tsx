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
    <div className="mb-5 sm:mb-6 pl-3 sm:pl-4 border-l-2 border-rule">
      {ancestors.map((a) => (
        <a
          key={a.id}
          href={`/item/${storyId}/c/${a.id}`}
          className="block mb-3.5 last:mb-3.5 hover:opacity-80 transition-opacity"
        >
          <div className="font-sans text-[11px] text-ink-4 mb-0.5 tracking-[0.02em]">
            <span className="text-ink-3 font-medium">@{a.by}</span>
            <span className="ml-1">· {formatRelativeTime(a.time)} ago</span>
          </div>
          <div className="font-serif text-[14px] text-ink-3 leading-[1.5]">
            {preview(a.text)}
          </div>
        </a>
      ))}
      <div className="font-sans text-[11px] text-ink-4 tracking-[0.06em] uppercase mt-1">
        replying to
      </div>
    </div>
  )
}
