/* ============================================
   CSS Gradient Generator
   ============================================ */

function updateGradient() {
  const type = document.getElementById('gradient-type').value;
  const angle = document.getElementById('gradient-angle').value;
  const color1 = document.getElementById('gradient-color1').value;
  const color2 = document.getElementById('gradient-color2').value;
  const preview = document.getElementById('gradient-preview');
  const output = document.getElementById('gradient-output');
  const angleDisplay = document.getElementById('gradient-angle-display');

  angleDisplay.textContent = `${angle}°`;

  let cssGradient;
  switch (type) {
    case 'linear':
      cssGradient = `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
      break;
    case 'radial':
      cssGradient = `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`;
      break;
    case 'conic':
      cssGradient = `conic-gradient(from ${angle}deg, ${color1} 0%, ${color2} 100%)`;
      break;
  }

  preview.style.background = cssGradient;
  output.value = `background: ${cssGradient};`;
}

function randomGradient() {
  const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  document.getElementById('gradient-color1').value = randomColor();
  document.getElementById('gradient-color2').value = randomColor();
  document.getElementById('gradient-angle').value = Math.floor(Math.random() * 360);
  updateGradient();
}

function copyGradientCSS() {
  const output = document.getElementById('gradient-output').value;
  navigator.clipboard.writeText(output).then(() => {
    showToast('📋 CSSをコピーしました！');
  });
}
