/* ============================================
   DevCraft Tools — Lorem Ipsum Generator
   ダミーテキスト生成（日本語対応）
   ============================================ */

const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus, nec auctor nibh, sed malesuada libero.",
  "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
  "Donec sed odio dui, ut pharetra augue molestie facilisis.",
  "Maecenas faucibus mollis interdum, integer posuere erat a ante.",
  "Nullam quis risus eget urna mollis ornare vel eu leo.",
  "Vestibulum id ligula porta felis euismod semper.",
  "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
  "Aenean lacinia bibendum nulla sed consectetur praesent commodo.",
  "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
  "Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
];

const LOREM_JP_SENTENCES = [
  "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。",
  "何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。",
  "吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。",
  "この書生というのは時々我々を捕えて煮て食うという話である。",
  "しかしその当時は何という考もなかったから別段恐しいとも思わなかった。",
  "ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。",
  "山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。",
  "意地を通せば窮屈だ。とかくに人の世は住みにくい。",
  "住みにくさが高じると、安い所へ引き越したくなる。",
  "どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。",
  "人の世を作ったものは神でもなければ鬼でもない。やはり向う三軒両隣りにちらちらするただの人である。",
  "ただの人が作った人の世が住みにくいからとて、越す国はあるまい。",
  "あらゆる芸術の士は人の世をのどかにし、人の心を豊かにするが故に尊い。",
  "春はあけぼの。やうやう白くなりゆく山際、少しあかりて、紫だちたる雲の細くたなびきたる。",
  "夏は夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。"
];

function generateLorem() {
  const paragraphCount = parseInt(document.getElementById('lorem-paragraphs').value) || 3;
  const sentencesPerParagraph = parseInt(document.getElementById('lorem-sentences').value) || 5;
  const language = document.getElementById('lorem-language').value;
  const startWithLorem = document.getElementById('lorem-start-classic')?.checked ?? true;

  const sentences = language === 'ja' ? LOREM_JP_SENTENCES : LOREM_SENTENCES;
  const paragraphs = [];

  for (let p = 0; p < paragraphCount; p++) {
    const para = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      if (p === 0 && s === 0 && startWithLorem && language !== 'ja') {
        para.push(LOREM_SENTENCES[0]);
      } else {
        const idx = Math.floor(Math.random() * sentences.length);
        para.push(sentences[idx]);
      }
    }
    paragraphs.push(para.join(' '));
  }

  const output = document.getElementById('lorem-output');
  output.value = paragraphs.join('\n\n');

  // Update stats
  const text = output.value;
  const stats = document.getElementById('lorem-stats');
  if (stats) {
    const words = language === 'ja'
      ? text.replace(/\s/g, '').length
      : text.split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    const label = language === 'ja' ? '文字' : '単語';
    stats.innerHTML = `<span>${paragraphCount} 段落</span> · <span>${words} ${label}</span> · <span>${chars} 文字数</span>`;
  }
}

function clearLorem() {
  document.getElementById('lorem-output').value = '';
  const stats = document.getElementById('lorem-stats');
  if (stats) stats.innerHTML = '';
}

function copyLoremOutput() {
  copyOutput('lorem-output');
}
