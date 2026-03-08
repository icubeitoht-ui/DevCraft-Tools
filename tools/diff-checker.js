/* ============================================
   DevCraft Tools — Diff Checker
   テキスト差分比較ツール
   ============================================ */

function runDiff() {
  const text1 = document.getElementById('diff-input1').value;
  const text2 = document.getElementById('diff-input2').value;
  const output = document.getElementById('diff-output');

  if (!text1 && !text2) {
    output.innerHTML = '<p style="color: var(--text-muted);">テキストを入力してください...</p>';
    return;
  }

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  // Compute LCS table
  const lcs = computeLCS(lines1, lines2);
  const diff = buildDiff(lines1, lines2, lcs);

  // Render diff
  let html = '';
  let addCount = 0, removeCount = 0, unchangeCount = 0;

  diff.forEach((item, index) => {
    const lineNum = index + 1;
    const escapedText = escapeHtml(item.text);

    switch (item.type) {
      case 'add':
        html += `<div class="diff-line diff-add"><span class="diff-line-num">+</span><span class="diff-line-prefix">+</span><span class="diff-line-content">${escapedText}</span></div>`;
        addCount++;
        break;
      case 'remove':
        html += `<div class="diff-line diff-remove"><span class="diff-line-num">-</span><span class="diff-line-prefix">-</span><span class="diff-line-content">${escapedText}</span></div>`;
        removeCount++;
        break;
      case 'equal':
        html += `<div class="diff-line diff-equal"><span class="diff-line-num"> </span><span class="diff-line-prefix"> </span><span class="diff-line-content">${escapedText}</span></div>`;
        unchangeCount++;
        break;
    }
  });

  output.innerHTML = html || '<p style="color: var(--text-muted);">差分なし — テキストは同一です。</p>';

  // Update stats
  const stats = document.getElementById('diff-stats');
  if (stats) {
    stats.innerHTML = `
      <span class="diff-stat-add">+${addCount} 追加</span>
      <span class="diff-stat-remove">-${removeCount} 削除</span>
      <span class="diff-stat-equal">${unchangeCount} 変更なし</span>
    `;
  }
}

function computeLCS(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

function buildDiff(a, b, dp) {
  const result = [];
  let i = a.length;
  let j = b.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: 'equal', text: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'add', text: b[j - 1] });
      j--;
    } else if (i > 0) {
      result.unshift({ type: 'remove', text: a[i - 1] });
      i--;
    }
  }

  return result;
}

function swapDiffInputs() {
  const input1 = document.getElementById('diff-input1');
  const input2 = document.getElementById('diff-input2');
  const temp = input1.value;
  input1.value = input2.value;
  input2.value = temp;
  runDiff();
}

function clearDiff() {
  document.getElementById('diff-input1').value = '';
  document.getElementById('diff-input2').value = '';
  document.getElementById('diff-output').innerHTML = '<p style="color: var(--text-muted);">差分結果がここに表示されます...</p>';
  const stats = document.getElementById('diff-stats');
  if (stats) stats.innerHTML = '';
}
