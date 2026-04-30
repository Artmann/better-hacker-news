import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import StoryPage from './page'
import { getItems, getStory } from '@/lib/hn/api'
import { makeComment, makeStory } from '@/lib/hn/__fixtures__/stories'

vi.mock('@/lib/hn/api', () => ({
  getStory: vi.fn(),
  getItems: vi.fn()
}))

class NotFoundError extends Error {
  digest = 'NEXT_NOT_FOUND'
}

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new NotFoundError('NEXT_NOT_FOUND')
  }
}))

const mockedGetStory = vi.mocked(getStory)
const mockedGetItems = vi.mocked(getItems)

function pageProps(id: string) {
  return { params: Promise.resolve({ id }) }
}

describe('StoryPage', () => {
  beforeEach(() => {
    mockedGetStory.mockReset()
    mockedGetItems.mockReset()
  })

  it('renders the story title and live comments', async () => {
    const story = makeStory({ id: 100, title: 'A great article' })
    mockedGetStory.mockResolvedValue(story)
    mockedGetItems.mockResolvedValue([
      makeComment({ id: 200, text: '<p>Insightful comment text.</p>' }),
      makeComment({ id: 201, text: '<p>Second take.</p>' })
    ])

    const tree = await StoryPage(pageProps('100'))
    render(tree)

    expect(mockedGetStory).toHaveBeenCalledWith(100)
    expect(mockedGetItems).toHaveBeenCalledWith([200, 201])
    expect(
      screen.getByRole('heading', { level: 1, name: /a great article/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/insightful comment text/i)).toBeInTheDocument()
    expect(screen.getByText(/second take/i)).toBeInTheDocument()
  })

  it('skips fetching kids when the story has none', async () => {
    mockedGetStory.mockResolvedValue(makeStory({ kids: undefined }))

    const tree = await StoryPage(pageProps('100'))
    render(tree)

    expect(mockedGetItems).not.toHaveBeenCalled()
    expect(screen.getByText(/no replies yet/i)).toBeInTheDocument()
  })

  it('filters out non-comment kids', async () => {
    mockedGetStory.mockResolvedValue(makeStory({ kids: [200, 300] }))
    mockedGetItems.mockResolvedValue([
      makeComment({ id: 200, text: '<p>Real reply.</p>' }),
      makeStory({ id: 300, title: 'Not a comment' })
    ])

    const tree = await StoryPage(pageProps('100'))
    render(tree)

    expect(screen.getByText(/real reply/i)).toBeInTheDocument()
    expect(screen.queryByText(/not a comment/i)).not.toBeInTheDocument()
    expect(screen.getByText(/^1 reply$/i)).toBeInTheDocument()
  })

  it('calls notFound when the id is not numeric', async () => {
    await expect(StoryPage(pageProps('abc'))).rejects.toThrow(NotFoundError)
    expect(mockedGetStory).not.toHaveBeenCalled()
  })

  it('calls notFound when the story is missing', async () => {
    mockedGetStory.mockResolvedValue(null)

    await expect(StoryPage(pageProps('999'))).rejects.toThrow(NotFoundError)
  })
})
