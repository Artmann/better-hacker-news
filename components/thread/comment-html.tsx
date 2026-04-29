// HN comment text is a constrained subset of HTML: <p>, <a>, <i>, <pre><code>.
// We render via dangerouslySetInnerHTML after lightly normalizing.
// (Untrusted input — but HN's API only emits the whitelist above.)

function normalize(html: string): string {
  // HN bodies don't wrap the first paragraph in <p>; do it ourselves so spacing is consistent.
  if (!html.startsWith('<p>')) {
    return `<p>${html}</p>`
  }
  return html
}

export function CommentHtml({ html }: { html: string }) {
  return (
    <div
      className="hn-prose"
      dangerouslySetInnerHTML={{ __html: normalize(html) }}
    />
  )
}
