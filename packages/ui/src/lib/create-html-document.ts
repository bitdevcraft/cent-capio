export function createHtmlDocument({
  editorHtml,
  katexCDN,
  tailwindCss,
  theme,
}: {
  editorHtml: string;
  tailwindCss: string;
  katexCDN?: string;
  theme?: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en"${theme === "dark" ? ' class="dark"' : ""}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    ${tailwindCss}
    ${katexCDN}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --font-sans: 'Inter', 'Inter Fallback';
        --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
      }
    </style>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        // 1. Find all toggle headers
        const toggles = document.querySelectorAll('[data-slate-type="toggle"]');

        toggles.forEach(toggle => {
          // 2. Hide all following indent blocks initially
          let nxt = toggle.nextElementSibling;
          while (nxt && nxt.hasAttribute('data-slate-indent')) {
            nxt.style.display = 'none';
            nxt = nxt.nextElementSibling;
          }

          // 3. Make header clickable
          toggle.style.cursor = 'pointer';
          toggle.addEventListener('click', () => {
            // Determine new state: if first indent is hidden → we’re opening
            const firstIndent = toggle.nextElementSibling;
            const opening = firstIndent && firstIndent.style.display === 'none';

            // 4. Toggle each indent sibling
            let curr = firstIndent;
            while (curr && curr.hasAttribute('data-slate-indent')) {
              curr.style.display = opening ? '' : 'none';
              curr = curr.nextElementSibling;
            }

            // 5. Rotate the chevron
            const icon = toggle.querySelector('svg');
            if (icon) {
              icon.classList.toggle('rotate-0');
              icon.classList.toggle('rotate-90');
            }
          });
        });
      });
    </script>
  </head>
  <body>
    ${editorHtml}
  </body>
</html>`;
}
