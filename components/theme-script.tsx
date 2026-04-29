const SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem('ember-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.dataset.theme = stored;
    }
  } catch (_) {}
})();`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
