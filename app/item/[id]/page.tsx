import { notFound } from 'next/navigation'
import { getItems, getStory } from '@/lib/hn/api'
import { isComment } from '@/lib/hn/derive'
import type { HnComment } from '@/lib/hn/types'
import { ThreadBar } from '@/components/thread/thread-bar'
import { FocalStory } from '@/components/thread/focal-story'
import { Replies } from '@/components/thread/replies'

export const revalidate = 300

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StoryPage({ params }: PageProps) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (!Number.isFinite(id)) {
    notFound()
  }

  const story = await getStory(id)
  if (!story) {
    notFound()
  }

  const replyItems = story.kids ? await getItems(story.kids) : []
  const replies: Array<HnComment | null> = replyItems.map((item) => {
    if (!item) {
      return null
    }
    if (!isComment(item)) {
      return null
    }
    return item
  })

  return (
    <div className="pt-10 pb-32">
      <ThreadBar crumbs={[{ label: story.title }]} />
      <FocalStory story={story} />
      <Replies
        storyId={story.id}
        comments={replies}
      />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (!Number.isFinite(id)) {
    return { title: 'Better Hacker News' }
  }
  const story = await getStory(id)
  return { title: story ? `${story.title} — Better Hacker News` : 'Better Hacker News' }
}
