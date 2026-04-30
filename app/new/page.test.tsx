import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import NewPage from './page'

vi.mock('@/components/listing/listing-view', () => ({
  ListingView: ({ kind }: { kind: string }) => (
    <div
      data-testid="listing-view"
      data-kind={kind}
    />
  )
}))

describe('NewPage', () => {
  it('delegates to ListingView with kind="new"', () => {
    render(NewPage())

    const view = screen.getByTestId('listing-view')
    expect(view).toHaveAttribute('data-kind', 'new')
  })
})
