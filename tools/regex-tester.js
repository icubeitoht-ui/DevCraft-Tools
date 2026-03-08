/* ============================================
   Regex Tester
   ============================================ */

function testRegex() {
  const pattern = document.getElementById('regex-pattern').value;
  const flags = document.getElementById('regex-flags').value;
  const input = document.getElementById('regex-input').value;
  const output = document.getElementById('regex-output');
  const matchInfo = document.getElementById('regex-match-info');

  if (!pattern) {
    output.innerHTML = escapeHtml(input);
    matchInfo.innerHTML = '<span class="match-count">パターンを入力してください</span>';
    return;
  }

  try {
    const regex = new RegExp(pattern, flags);
    let matchCount = 0;
    const matches = [];

    // Collect all matches
    let match;
    const globalRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    while ((match = globalRegex.exec(input)) !== null) {
      matches.push({
        value: match[0],
        index: match.index,
        groups: match.slice(1)
      });
      matchCount++;
      if (matchCount > 1000) break; // Safety limit
    }

    // Highlight matches in output
    if (matchCount > 0) {
      let result = '';
      let lastIndex = 0;
      matches.forEach(m => {
        result += escapeHtml(input.substring(lastIndex, m.index));
        result += `<span class="regex-match">${escapeHtml(m.value)}</span>`;
        lastIndex = m.index + m.value.length;
      });
      result += escapeHtml(input.substring(lastIndex));
      output.innerHTML = result;
    } else {
      output.innerHTML = escapeHtml(input);
    }

    // Match details
    let detailsHtml = `<span class="match-count">マッチ: <strong>${matchCount}</strong></span>`;
    if (matches.length > 0 && matches.length <= 20) {
      detailsHtml += '<span style="margin-left: 16px; color: var(--text-muted); font-size: 0.8rem;">';
      detailsHtml += matches.map((m, i) => `[${i}] "${escapeHtml(m.value)}"`).join('  ');
      detailsHtml += '</span>';
    }
    matchInfo.innerHTML = detailsHtml;

  } catch (e) {
    output.innerHTML = escapeHtml(input);
    matchInfo.innerHTML = `<span style="color: var(--accent-tertiary); font-size: 0.85rem;">❌ ${escapeHtml(e.message)}</span>`;
  }
}
