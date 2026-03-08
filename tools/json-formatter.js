/* ============================================
   JSON Formatter & Validator
   ============================================ */

function jsonFormat() {
  const input = document.getElementById('json-input').value.trim();
  const output = document.getElementById('json-output');
  const status = document.getElementById('json-status');

  if (!input) {
    status.textContent = '⚠️ JSONを入力してください';
    status.className = 'status-bar invalid';
    return;
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    output.value = formatted;
    status.textContent = '✅ 有効なJSON — 整形完了';
    status.className = 'status-bar valid';
  } catch (e) {
    output.value = '';
    status.textContent = `❌ エラー: ${e.message}`;
    status.className = 'status-bar invalid';
  }
}

function jsonMinify() {
  const input = document.getElementById('json-input').value.trim();
  const output = document.getElementById('json-output');
  const status = document.getElementById('json-status');

  if (!input) {
    status.textContent = '⚠️ JSONを入力してください';
    status.className = 'status-bar invalid';
    return;
  }

  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    output.value = minified;

    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    status.textContent = `✅ ミニファイ完了 — ${originalSize}B → ${minifiedSize}B (${saved}% 削減)`;
    status.className = 'status-bar valid';
  } catch (e) {
    output.value = '';
    status.textContent = `❌ エラー: ${e.message}`;
    status.className = 'status-bar invalid';
  }
}

function jsonValidate() {
  const input = document.getElementById('json-input').value.trim();
  const status = document.getElementById('json-status');
  const output = document.getElementById('json-output');

  if (!input) {
    status.textContent = '⚠️ JSONを入力してください';
    status.className = 'status-bar invalid';
    return;
  }

  try {
    const parsed = JSON.parse(input);
    const type = Array.isArray(parsed) ? 'Array' : typeof parsed;
    const keys = typeof parsed === 'object' && parsed !== null
      ? Object.keys(parsed).length
      : 0;

    output.value = JSON.stringify(parsed, null, 2);
    status.textContent = `✅ 有効なJSON — タイプ: ${type}, キー数: ${keys}`;
    status.className = 'status-bar valid';
  } catch (e) {
    output.value = '';

    // Try to find error position
    const match = e.message.match(/position (\d+)/);
    let errorDetails = e.message;
    if (match) {
      const pos = parseInt(match[1]);
      const lines = input.substring(0, pos).split('\n');
      const line = lines.length;
      const col = lines[lines.length - 1].length + 1;
      errorDetails = `${e.message} (行: ${line}, 列: ${col})`;
    }

    status.textContent = `❌ 無効なJSON: ${errorDetails}`;
    status.className = 'status-bar invalid';
  }
}

function jsonClear() {
  document.getElementById('json-input').value = '';
  document.getElementById('json-output').value = '';
  document.getElementById('json-status').textContent = '';
  document.getElementById('json-status').className = 'status-bar';
}
