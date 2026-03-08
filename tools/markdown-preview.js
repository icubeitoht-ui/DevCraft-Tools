/* ============================================
   DevCraft Tools — Markdown Preview
   リアルタイムMarkdownプレビュー
   ============================================ */

function initMarkdown() {
  const input = document.getElementById('markdown-input');
  if (input && input.value) {
    renderMarkdown();
  } else if (input) {
    // Set default sample
    input.value = `# DevCraft Tools へようこそ！

## Markdownプレビューの使い方

テキストを左側に入力すると、**リアルタイム**でプレビューが表示されます。

### 対応構文

- **太字テキスト** と *斜体テキスト*
- [リンク](https://example.com)
- リスト（番号付き・番号なし）
- \`インラインコード\` とコードブロック
- > 引用ブロック
- 見出し（h1〜h6）
- 水平線
- ~~取り消し線~~

### コードブロック

\`\`\`javascript
function hello() {
  console.log("Hello, DevCraft!");
}
\`\`\`

### 番号付きリスト

1. JSON Formatter
2. CSS Gradient Generator
3. Regex Tester
4. Color Palette
5. Base64 Converter
6. **Markdown Preview** ← 今ここ！

---

> 💡 すべてブラウザ上で処理されます。データはサーバーに送信されません。
`;
    renderMarkdown();
  }
}

function renderMarkdown() {
  const input = document.getElementById('markdown-input');
  const output = document.getElementById('markdown-output');
  if (!input || !output) return;

  const md = input.value;
  const html = parseMarkdown(md);
  output.innerHTML = html;
}

function parseMarkdown(md) {
  let html = md;

  // Escape HTML (but preserve our markdown processing)
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="md-code-block"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code (`...`)
  html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

  // Headings (h1-h6)
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="md-h6">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="md-h5">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="md-h4">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="md-h3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="md-h2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="md-h1">$1</h1>');

  // Horizontal rule
  html = html.replace(/^---+$/gm, '<hr class="md-hr">');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic (*text* or _text_)
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough (~~text~~)
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="md-link">$1</a>');

  // Images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img">');

  // Blockquotes (&gt; text)
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote class="md-blockquote">/g, '<br>');

  // Unordered lists (- item)
  html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li class="md-li">$1</li>');
  html = html.replace(/((?:<li class="md-li">.*<\/li>\n?)+)/g, '<ul class="md-ul">$1</ul>');

  // Ordered lists (1. item)
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="md-oli">$1</li>');
  html = html.replace(/((?:<li class="md-oli">.*<\/li>\n?)+)/g, '<ol class="md-ol">$1</ol>');

  // Paragraphs (wrap remaining text in <p> tags)
  html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="md-p">$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p class="md-p"><\/p>/g, '');

  return html;
}

function clearMarkdown() {
  document.getElementById('markdown-input').value = '';
  document.getElementById('markdown-output').innerHTML = '<p style="color: var(--text-muted);">プレビューがここに表示されます...</p>';
}

function copyMarkdownHtml() {
  const output = document.getElementById('markdown-output');
  navigator.clipboard.writeText(output.innerHTML).then(() => {
    showToast('📋 HTMLをコピーしました！');
  });
}
