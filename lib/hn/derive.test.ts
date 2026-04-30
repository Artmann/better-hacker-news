import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  decodeHtmlEntities,
  formatRelativeTime,
  getDomain,
  isComment,
  isStory,
  stripTags
} from './derive'
import type { HnComment, HnStory } from './types'

describe('getDomain', () => {
  it('returns null for undefined', () => {
    expect(getDomain(undefined)).toBeNull()
  })

  it('strips leading www.', () => {
    expect(getDomain('https://www.example.com/foo')).toBe('example.com')
  })

  it('keeps subdomains other than www', () => {
    expect(getDomain('https://blog.example.com/foo')).toBe('blog.example.com')
  })

  it('returns null for malformed URLs', () => {
    expect(getDomain('not a url')).toBeNull()
  })
})

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-30T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function ago(seconds: number): number {
    return Math.floor(Date.now() / 1000) - seconds
  }

  it('formats seconds', () => {
    expect(formatRelativeTime(ago(5))).toBe('5s')
  })

  it('formats minutes', () => {
    expect(formatRelativeTime(ago(120))).toBe('2m')
  })

  it('formats hours', () => {
    expect(formatRelativeTime(ago(3600 * 3))).toBe('3h')
  })

  it('formats days', () => {
    expect(formatRelativeTime(ago(86_400 * 2))).toBe('2d')
  })

  it('formats months', () => {
    expect(formatRelativeTime(ago(86_400 * 60))).toBe('2mo')
  })

  it('formats years', () => {
    expect(formatRelativeTime(ago(86_400 * 365 * 3))).toBe('3y')
  })

  it('clamps future timestamps to 0s', () => {
    expect(formatRelativeTime(ago(-10))).toBe('0s')
  })
})

describe('decodeHtmlEntities', () => {
  it('decodes the supported entities', () => {
    expect(
      decodeHtmlEntities('Tom &amp; Jerry &lt;3 &quot;hi&quot; &#x27;ok&#39;')
    ).toBe(`Tom & Jerry <3 "hi" 'ok'`)
  })

  it('leaves unknown entities untouched', () => {
    expect(decodeHtmlEntities('&copy; 2026')).toBe('&copy; 2026')
  })
})

describe('stripTags', () => {
  it('removes tags and decodes entities', () => {
    expect(stripTags('<p>Hello &amp; <b>welcome</b></p>')).toBe(
      'Hello & welcome'
    )
  })

  it('collapses whitespace', () => {
    expect(stripTags('<p>a</p>\n\n<p>b</p>')).toBe('a b')
  })
})

describe('isStory / isComment', () => {
  const story: HnStory = {
    id: 1,
    type: 'story',
    title: 't',
    score: 0,
    time: 0
  }
  const comment: HnComment = {
    id: 2,
    type: 'comment',
    parent: 1,
    time: 0
  }

  it('discriminates stories', () => {
    expect(isStory(story)).toBe(true)
    expect(isStory(comment)).toBe(false)
  })

  it('discriminates comments', () => {
    expect(isComment(comment)).toBe(true)
    expect(isComment(story)).toBe(false)
  })
})
