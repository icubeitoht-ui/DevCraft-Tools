/* ============================================
   DevCraft Tools — Main Application Logic
   ルーティング・ナビゲーション・共通機能
   ============================================ */

// ---- Page Routing ----
const pages = ['home', 'json', 'gradient', 'regex', 'color', 'base64'];
let currentPage = 'home';

function navigateTo(page) {
  if (!pages.includes(page)) return;

  // Hide all pages
  pages.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });

  // Show selected page
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.dataset.tool === page);
  });

  currentPage = page;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Initialize tool-specific features
  initTool(page);

  // Close mobile nav
  document.getElementById('nav-links').classList.remove('open');
}

function initTool(tool) {
  switch (tool) {
    case 'gradient':
      updateGradient();
      break;
    case 'color':
      generatePalette();
      break;
    case 'regex':
      testRegex();
      break;
  }
}

// ---- Event Listeners ----
document.addEventListener('DOMContentLoaded', () => {
  // Nav links
  document.querySelectorAll('[data-tool]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.dataset.tool);
    });
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Logo click → home
  document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Smooth scroll for #tools anchor
  const ctaTools = document.getElementById('cta-tools');
  if (ctaTools) {
    ctaTools.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initialize on home
  navigateTo('home');
});

// ---- Common Utilities ----
function copyOutput(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.value || el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 コピーしました！');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('📋 コピーしました！');
  });
}

function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 12px 24px;
    background: rgba(108, 99, 255, 0.9);
    color: white;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 10000;
    animation: fadeInUp 0.3s ease-out;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(108, 99, 255, 0.4);
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
