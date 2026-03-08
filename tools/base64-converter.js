/* ============================================
   Base64 Encoder / Decoder
   ============================================ */

function base64Encode() {
  const input = document.getElementById('base64-input').value;
  const output = document.getElementById('base64-output');
  const status = document.getElementById('base64-status');

  if (!input) {
    status.textContent = '⚠️ テキストを入力してください';
    status.className = 'status-bar invalid';
    return;
  }

  try {
    // Support Unicode
    const encoded = btoa(unescape(encodeURIComponent(input)));
    output.value = encoded;

    const originalSize = new Blob([input]).size;
    const encodedSize = new Blob([encoded]).size;

    status.textContent = `✅ エンコード完了 — ${originalSize}B → ${encodedSize}B`;
    status.className = 'status-bar valid';
  } catch (e) {
    output.value = '';
    status.textContent = `❌ エンコードエラー: ${e.message}`;
    status.className = 'status-bar invalid';
  }
}

function base64Decode() {
  const input = document.getElementById('base64-input').value.trim();
  const output = document.getElementById('base64-output');
  const status = document.getElementById('base64-status');

  if (!input) {
    status.textContent = '⚠️ Base64文字列を入力してください';
    status.className = 'status-bar invalid';
    return;
  }

  try {
    // Support Unicode
    const decoded = decodeURIComponent(escape(atob(input)));
    output.value = decoded;
    status.textContent = '✅ デコード完了';
    status.className = 'status-bar valid';
  } catch (e) {
    output.value = '';
    status.textContent = '❌ 無効なBase64文字列です';
    status.className = 'status-bar invalid';
  }
}

function base64Clear() {
  document.getElementById('base64-input').value = '';
  document.getElementById('base64-output').value = '';
  document.getElementById('base64-status').textContent = '';
  document.getElementById('base64-status').className = 'status-bar';
}
