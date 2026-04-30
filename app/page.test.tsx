import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './page'

vi.mock('@/components/listing/listing-view', () => ({
  ListingView: ({ kind }: { kind: string }) => (
    <div
      data-testid="listing-view"
      data-kind={kind}
    />
  )
}))

describe('HomePage', () => {
  it('delegates to ListingView with kind="top"', () => {
    render(HomePage())

    const view = screen.getByTestId('listing-view')
    expect(view).toHaveAttribute('data-kind', 'top')
  })
})
