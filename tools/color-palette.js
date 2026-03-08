/* ============================================
   Color Palette Generator & Converter
   ============================================ */

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function colorFromHex() {
  let hex = document.getElementById('color-hex').value;
  if (!hex.startsWith('#')) hex = '#' + hex;
  const rgb = hexToRgb(hex);
  if (!rgb) return;

  document.getElementById('color-r').value = rgb.r;
  document.getElementById('color-g').value = rgb.g;
  document.getElementById('color-b').value = rgb.b;
  document.getElementById('color-base').value = hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  document.getElementById('color-hsl-display').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function colorFromRGB() {
  const r = parseInt(document.getElementById('color-r').value) || 0;
  const g = parseInt(document.getElementById('color-g').value) || 0;
  const b = parseInt(document.getElementById('color-b').value) || 0;

  const hex = rgbToHex(r, g, b);
  document.getElementById('color-hex').value = hex;
  document.getElementById('color-base').value = hex;

  const hsl = rgbToHsl(r, g, b);
  document.getElementById('color-hsl-display').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function generatePalette() {
  const baseColor = document.getElementById('color-base').value;
  const mode = document.getElementById('color-mode').value;
  const grid = document.getElementById('palette-grid');

  const rgb = hexToRgb(baseColor);
  if (!rgb) return;

  // Update converter
  document.getElementById('color-hex').value = baseColor;
  document.getElementById('color-r').value = rgb.r;
  document.getElementById('color-g').value = rgb.g;
  document.getElementById('color-b').value = rgb.b;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  document.getElementById('color-hsl-display').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  let colors = [];

  switch (mode) {
    case 'analogous':
      for (let i = -2; i <= 2; i++) {
        const h = (hsl.h + i * 30 + 360) % 360;
        const newRgb = hslToRgb(h, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      }
      break;

    case 'complementary':
      colors.push(baseColor);
      const compH = (hsl.h + 180) % 360;
      const compRgb = hslToRgb(compH, hsl.s, hsl.l);
      colors.push(rgbToHex(compRgb.r, compRgb.g, compRgb.b));
      // Add variations
      for (let l = 30; l <= 70; l += 20) {
        const v1 = hslToRgb(hsl.h, hsl.s, l);
        colors.push(rgbToHex(v1.r, v1.g, v1.b));
      }
      break;

    case 'triadic':
      for (let i = 0; i < 3; i++) {
        const h = (hsl.h + i * 120) % 360;
        const newRgb = hslToRgb(h, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        // Lighter version
        const lighter = hslToRgb(h, hsl.s, Math.min(90, hsl.l + 20));
        colors.push(rgbToHex(lighter.r, lighter.g, lighter.b));
      }
      break;

    case 'shades':
      for (let l = 10; l <= 90; l += 10) {
        const newRgb = hslToRgb(hsl.h, hsl.s, l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      }
      break;

    case 'random':
      for (let i = 0; i < 8; i++) {
        const h = Math.floor(Math.random() * 360);
        const s = 50 + Math.floor(Math.random() * 50);
        const l = 30 + Math.floor(Math.random() * 40);
        const newRgb = hslToRgb(h, s, l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      }
      break;
  }

  // Render palette
  grid.innerHTML = colors.map(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `
      <div class="palette-color" onclick="copyColor('${color}')">
        <div class="palette-color-preview" style="background: ${color}"></div>
        <div class="palette-color-info">
          ${color.toUpperCase()}<br>
          <span style="font-size: 0.65rem; color: var(--text-muted);">
            rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function copyColor(color) {
  navigator.clipboard.writeText(color).then(() => {
    showToast(`🎨 ${color} をコピーしました！`);
  });
}
