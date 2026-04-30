import Link from 'next/link'

export const metadata = {
  title: 'About — Better Hacker News',
  description:
    'A calmer, more readable front-end for news.ycombinator.com.'
}

export default function AboutPage() {
  return (
    <article className="pt-12 sm:pt-20 pb-32 max-w-[620px]">
      <div className="font-sans text-[10px] sm:text-[11px] text-ink-4 uppercase tracking-[0.16em] mb-4">
        About
      </div>
      <h1 className="font-serif text-[34px] sm:text-[44px] leading-[1.05] font-semibold tracking-[-0.02em] mb-6 [text-wrap:balance]">
        A calmer reading of Hacker News.
      </h1>
      <div className="hn-prose font-serif text-[17px] sm:text-[18px] leading-[1.65] text-ink-2">
        <p>
          Better Hacker News is a typographic reader for{' '}
          <a
            href="https://news.ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            news.ycombinator.com
          </a>
          . It pulls from the public Hacker News API and presents the same
          stories with longer-form type, generous spacing, and a single
          un-cluttered column.
        </p>
        <p>
          The intent is not to replace Hacker News. The intent is to make it
          easier to <em>read</em> — to sit with a story instead of skimming a
          dense list, and to follow a thread without losing the path back.
        </p>

        <h2 className="font-serif text-[22px] sm:text-[24px] font-semibold tracking-[-0.01em] text-ink mt-10 mb-2">
          The four sections
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 my-2">
          <li>
            <strong className="text-ink font-semibold">Top</strong> — the
            current Hacker News front page.
          </li>
          <li>
            <strong className="text-ink font-semibold">New</strong> — recently
            submitted stories, before voting has settled.
          </li>
          <li>
            <strong className="text-ink font-semibold">Ask</strong> —
            “Ask HN:” questions posted by the community.
          </li>
          <li>
            <strong className="text-ink font-semibold">Show</strong> —
            “Show HN:” projects and demos shared by their creators.
          </li>
        </ul>

        <h2 className="font-serif text-[22px] sm:text-[24px] font-semibold tracking-[-0.01em] text-ink mt-10 mb-2">
          Keyboard
        </h2>
        <p>
          Press <kbd className="font-mono text-[0.85em] bg-bg-sunk px-1.5 py-px rounded">?</kbd>{' '}
          on any list page for the shortcut palette. The basics:{' '}
          <kbd className="font-mono text-[0.85em] bg-bg-sunk px-1.5 py-px rounded">j</kbd>{' '}
          and{' '}
          <kbd className="font-mono text-[0.85em] bg-bg-sunk px-1.5 py-px rounded">k</kbd>{' '}
          to move between stories,{' '}
          <kbd className="font-mono text-[0.85em] bg-bg-sunk px-1.5 py-px rounded">o</kbd>{' '}
          to open the linked article,{' '}
          <kbd className="font-mono text-[0.85em] bg-bg-sunk px-1.5 py-px rounded">c</kbd>{' '}
          to read the comments. Stories you have visited are dimmed
          automatically.
        </p>

        <h2 className="font-serif text-[22px] sm:text-[24px] font-semibold tracking-[-0.01em] text-ink mt-10 mb-2">
          Credits
        </h2>
        <p>
          Stories, comments, and scores are owned by Hacker News and its
          contributors and are served live from the{' '}
          <a
            href="https://github.com/HackerNews/API"
            target="_blank"
            rel="noopener noreferrer"
          >
            official HN API
          </a>
          . Better Hacker News is a reading layer; everything you see was
          written by someone on Hacker News.
        </p>
      </div>

      <div className="mt-14">
        <Link
          href="/"
          className="font-sans text-[13px] text-accent-ink border-b border-accent-ink/30 hover:border-accent-ink transition-colors pb-px"
        >
          ← Back to today’s edition
        </Link>
      </div>
    </article>
  )
}
