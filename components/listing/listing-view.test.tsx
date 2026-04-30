import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ListingView } from './listing-view'
import { getTopStoriesWithDetail } from '@/lib/hn/api'
import { makeAskStory, makeStory } from '@/lib/hn/__fixtures__/stories'

vi.mock('@/lib/hn/api', () => ({
  getTopStoriesWithDetail: vi.fn()
}))

vi.mock('./listing-client', () => ({
  ListingClient: () => <div data-testid="listing-client" />
}))

const mockedGet = vi.mocked(getTopStoriesWithDetail)

describe('ListingView', () => {
  beforeEach(() => {
    mockedGet.mockReset()
  })

  it('fetches stories for the requested kind and renders rows', async () => {
    mockedGet.mockResolvedValue([
      makeStory({ id: 1, title: 'First story' }),
      makeAskStory({ id: 2, title: 'Ask HN: question' })
    ])

    const tree = await ListingView({ kind: 'top' })
    render(tree)

    expect(mockedGet).toHaveBeenCalledWith('top', 30)
    expect(screen.getByText('First story')).toBeInTheDocument()
    expect(screen.getByText('Ask HN: question')).toBeInTheDocument()
    expect(screen.getByText(/showing 2 stories/i)).toBeInTheDocument()
  })

  it('renders an empty-state when there are no stories', async () => {
    mockedGet.mockResolvedValue([])

    const tree = await ListingView({ kind: 'new' })
    render(tree)

    expect(mockedGet).toHaveBeenCalledWith('new', 30)
    expect(screen.getByText(/no stories found/i)).toBeInTheDocument()
  })
})
