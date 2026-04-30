import { notFound } from 'next/navigation'
import { getItem, getItems, getStory } from '@/lib/hn/api'
import { isComment, walkAncestors } from '@/lib/hn/derive'
import type { HnComment } from '@/lib/hn/types'
import { ThreadBar, type CrumbItem } from '@/components/thread/thread-bar'
import { Ancestors } from '@/components/thread/ancestors'
import { FocalComment } from '@/components/thread/focal-comment'
import { Replies } from '@/components/thread/replies'

export const revalidate = 300

interface PageProps {
  params: Promise<{ id: string; commentId: string }>
}

export default async function CommentPage({ params }: PageProps) {
  const { id: storyParam, commentId: commentParam } = await params
  const storyId = Number(storyParam)
  const commentId = Number(commentParam)
  if (!Number.isFinite(storyId) || !Number.isFinite(commentId)) {
    notFound()
  }

  const [story, focal] = await Promise.all([
    getStory(storyId),
    getItem(commentId)
  ])

  if (!story || !focal || !isComment(focal)) {
    notFound()
  }

  const chain = await walkAncestors(focal)
  if (!chain || chain.storyId !== storyId) {
    notFound()
  }

  const replyItems = focal.kids ? await getItems(focal.kids) : []
  const replies: Array<HnComment | null> = replyItems.map((item) => {
    if (!item) {
      return null
    }
    if (!isComment(item)) {
      return null
    }
    return item
  })

  const crumbs: CrumbItem[] = [
    { label: story.title, href: `/item/${storyId}` },
    ...chain.ancestors.map((a) => ({
      label: `@${a.by}`,
      href: `/item/${storyId}/c/${a.id}`
    })),
    { label: `@${focal.by ?? '[deleted]'}` }
  ]

  return (
    <div className="pt-10 pb-32">
      <ThreadBar crumbs={crumbs} />
      <Ancestors
        ancestors={chain.ancestors}
        storyId={storyId}
      />
      <FocalComment
        comment={focal}
        storyTitle={story.title}
      />
      <Replies
        storyId={storyId}
        comments={replies}
      />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { commentId: commentParam } = await params
  const commentId = Number(commentParam)
  if (!Number.isFinite(commentId)) {
    return { title: 'Better Hacker News' }
  }
  const focal = await getItem(commentId)
  if (!focal || !isComment(focal)) {
    return { title: 'Better Hacker News' }
  }
  return {
    title: `Comment by @${focal.by ?? 'unknown'} — Better Hacker News`
  }
}
