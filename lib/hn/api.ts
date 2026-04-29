import type { HnItem, HnStory, HnUser, StoryKind } from './types'

const BASE = 'https://hacker-news.firebaseio.com/v0'

const LIST_PATH: Record<StoryKind, string> = {
  top: 'topstories',
  new: 'newstories',
  ask: 'askstories',
  show: 'showstories'
}

async function hnFetch<T>(path: string, revalidate: number): Promise<T> {
  const res = await fetch(`${BASE}/${path}.json`, {
    cache: 'force-cache',
    next: { revalidate }
  })
  if (!res.ok) {
    throw new Error(`HN API ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function getStoryIds(kind: StoryKind): Promise<number[]> {
  return hnFetch<number[]>(LIST_PATH[kind], 60)
}

export async function getItem(id: number): Promise<HnItem | null> {
  const item = await hnFetch<HnItem | null>(`item/${id}`, 300)
  return item
}

export async function getStory(id: number): Promise<HnStory | null> {
  const item = await getItem(id)
  if (!item) {
    return null
  }
  if (item.type === 'comment') {
    return null
  }
  return item
}

export async function getUser(id: string): Promise<HnUser | null> {
  return hnFetch<HnUser | null>(`user/${id}`, 600)
}

export async function getItems(ids: number[]): Promise<Array<HnItem | null>> {
  return Promise.all(ids.map((id) => getItem(id)))
}

export async function getTopStoriesWithDetail(
  kind: StoryKind,
  limit: number
): Promise<HnStory[]> {
  const ids = await getStoryIds(kind)
  const slice = ids.slice(0, limit)
  const items = await getItems(slice)
  const stories: HnStory[] = []
  for (const item of items) {
    if (!item) {
      continue
    }
    if (item.type === 'comment') {
      continue
    }
    stories.push(item)
  }
  return stories
}
