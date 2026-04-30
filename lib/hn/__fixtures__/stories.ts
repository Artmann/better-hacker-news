import type { HnComment, HnStory } from '../types'

export function makeStory(overrides: Partial<HnStory> = {}): HnStory {
  return {
    id: 100,
    type: 'story',
    title: 'A linkable story',
    url: 'https://example.com/article',
    by: 'alice',
    score: 42,
    time: Math.floor(Date.now() / 1000) - 3600,
    descendants: 2,
    kids: [200, 201],
    ...overrides
  }
}

export function makeAskStory(overrides: Partial<HnStory> = {}): HnStory {
  return makeStory({
    id: 101,
    title: 'Ask HN: how do you test?',
    url: undefined,
    text: '<p>I am curious about your testing setup.</p>',
    ...overrides
  })
}

export function makeComment(overrides: Partial<HnComment> = {}): HnComment {
  return {
    id: 200,
    type: 'comment',
    parent: 100,
    by: 'bob',
    text: '<p>Insightful comment text.</p>',
    time: Math.floor(Date.now() / 1000) - 1800,
    ...overrides
  }
}
