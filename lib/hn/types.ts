export type StoryKind = 'top' | 'new' | 'ask' | 'show'

export interface HnItemBase {
  id: number
  by?: string
  time: number
  deleted?: boolean
  dead?: boolean
}

export interface HnStory extends HnItemBase {
  type: 'story' | 'job' | 'poll'
  title: string
  url?: string
  text?: string
  score: number
  descendants?: number
  kids?: number[]
}

export interface HnComment extends HnItemBase {
  type: 'comment'
  text?: string
  parent: number
  kids?: number[]
}

export type HnItem = HnStory | HnComment

export interface HnUser {
  id: string
  created: number
  karma: number
  about?: string
  submitted?: number[]
}

export interface AncestorComment {
  id: number
  by: string
  text: string
  time: number
}

export interface AncestorChain {
  storyId: number
  storyTitle: string
  ancestors: AncestorComment[]
}
