import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StoryRow } from './story-row'
import { makeAskStory, makeStory } from '@/lib/hn/__fixtures__/stories'

describe('StoryRow', () => {
  it('points the title link at the external URL when one is set', () => {
    const story = makeStory({
      id: 42,
      title: 'External story',
      url: 'https://example.com/post'
    })

    render(
      <ul>
        <StoryRow
          story={story}
          rank={1}
        />
      </ul>
    )

    const title = screen.getByRole('heading', { name: /external story/i })
    const titleLink = title.closest('a')
    expect(titleLink).toHaveAttribute('href', 'https://example.com/post')
    expect(titleLink).toHaveAttribute('data-story-link')
  })

  it('points the title link at the item page for text posts (no url)', () => {
    const story = makeAskStory({ id: 77, title: 'Ask HN: anything' })

    render(
      <ul>
        <StoryRow
          story={story}
          rank={2}
        />
      </ul>
    )

    const title = screen.getByRole('heading', { name: /ask hn: anything/i })
    const titleLink = title.closest('a')
    expect(titleLink).toHaveAttribute('href', '/item/77')
    expect(titleLink).toHaveAttribute('data-story-link')
  })

  it('always points the replies link at the item conversation page', () => {
    const story = makeStory({
      id: 42,
      url: 'https://example.com/post',
      descendants: 5
    })

    render(
      <ul>
        <StoryRow
          story={story}
          rank={1}
        />
      </ul>
    )

    const replies = screen.getByRole('link', { name: /5 replies/i })
    expect(replies).toHaveAttribute('href', '/item/42')
    expect(replies).toHaveAttribute('data-story-comments')
  })
})
