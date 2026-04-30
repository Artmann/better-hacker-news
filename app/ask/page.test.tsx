import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AskPage from './page'

vi.mock('@/components/listing/listing-view', () => ({
  ListingView: ({ kind }: { kind: string }) => (
    <div
      data-testid="listing-view"
      data-kind={kind}
    />
  )
}))

describe('AskPage', () => {
  it('delegates to ListingView with kind="ask"', () => {
    render(AskPage())

    const view = screen.getByTestId('listing-view')
    expect(view).toHaveAttribute('data-kind', 'ask')
  })
})
