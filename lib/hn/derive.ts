import type {
  AncestorChain,
  AncestorComment,
  HnComment,
  HnItem,
  HnStory
} from './types'
import { getItem } from './api'

export function getDomain(url: string | undefined): string | null {
  if (!url) {
    return null
  }
  try {
    const host = new URL(url).hostname
    return host.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function formatRelativeTime(unixSeconds: number): string {
  const nowSec = Math.floor(Date.now() / 1000)
  const diff = Math.max(0, nowSec - unixSeconds)
  if (diff < 60) {
    return `${diff}s`
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m`
  }
  if (diff < 86_400) {
    return `${Math.floor(diff / 3600)}h`
  }
  if (diff < 86_400 * 30) {
    return `${Math.floor(diff / 86_400)}d`
  }
  if (diff < 86_400 * 365) {
    return `${Math.floor(diff / (86_400 * 30))}mo`
  }
  return `${Math.floor(diff / (86_400 * 365))}y`
}

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&#x2F;': '/',
  '&#47;': '/',
  '&nbsp;': ' '
}

export function decodeHtmlEntities(text: string): string {
  return text.replace(
    /&(?:amp|lt|gt|quot|nbsp|#x27|#39|#x2F|#47);/g,
    (match) => HTML_ENTITIES[match] ?? match
  )
}

export function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

export function isStory(item: HnItem): item is HnStory {
  return item.type !== 'comment'
}

export function isComment(item: HnItem): item is HnComment {
  return item.type === 'comment'
}

export async function walkAncestors(
  comment: HnComment
): Promise<AncestorChain | null> {
  const ancestors: AncestorComment[] = []
  let parentId: number | undefined = comment.parent
  let storyId: number | null = null
  let storyTitle = ''

  while (parentId) {
    const parent = await getItem(parentId)
    if (!parent) {
      break
    }
    if (parent.type === 'comment') {
      ancestors.unshift({
        id: parent.id,
        by: parent.by ?? '[deleted]',
        text: parent.text ?? '',
        time: parent.time
      })
      parentId = parent.parent
      continue
    }
    storyId = parent.id
    storyTitle = parent.title
    break
  }

  if (storyId === null) {
    return null
  }

  return { storyId, storyTitle, ancestors }
}
