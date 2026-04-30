import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShowPage from './page'

vi.mock('@/components/listing/listing-view', () => ({
  ListingView: ({ kind }: { kind: string }) => (
    <div
      data-testid="listing-view"
      data-kind={kind}
    />
  )
}))

describe('ShowPage', () => {
  it('delegates to ListingView with kind="show"', () => {
    render(ShowPage())

    const view = screen.getByTestId('listing-view')
    expect(view).toHaveAttribute('data-kind', 'show')
  })
})
