import { Masthead } from './masthead'
import { StoryRow } from './story-row'
import { getTopStoriesWithDetail } from '@/lib/hn/api'
import type { StoryKind } from '@/lib/hn/types'

const PAGE_SIZE = 30

export async function ListingView({ kind }: { kind: StoryKind }) {
  const stories = await getTopStoriesWithDetail(kind, PAGE_SIZE)

  return (
    <div>
      <Masthead active={kind} />

      {stories.length === 0 ? (
        <div className="py-16 text-center font-sans text-[13px] text-ink-3">
          No stories found.
        </div>
      ) : (
        <ol className="pt-2">
          {stories.map((story, index) => (
            <StoryRow
              key={story.id}
              story={story}
              rank={index + 1}
            />
          ))}
        </ol>
      )}

      <footer className="pt-10 pb-20 font-sans text-[12px] text-ink-4 flex gap-2 justify-center">
        <span>showing {stories.length} stories</span>
        <span className="text-ink-4">·</span>
        <span>via news.ycombinator.com</span>
      </footer>
    </div>
  )
}
