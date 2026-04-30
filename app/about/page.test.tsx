import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from './page'

describe('AboutPage', () => {
  it('renders the heading and section titles', () => {
    render(AboutPage())

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a calmer reading of hacker news/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /the four sections/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /keyboard/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /credits/i })
    ).toBeInTheDocument()
  })

  it('links back to the home page', () => {
    render(AboutPage())

    const back = screen.getByRole('link', { name: /back to today/i })
    expect(back).toHaveAttribute('href', '/')
  })
})
