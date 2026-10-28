export const CLOAK_CONFIGS = {
  none: {
    title: 'Nova Arcade - Unblocked Games',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='6 3 20 12 6 21 6 3'/></svg>",
    name: 'Default (No Cloak)'
  },
  classroom: {
    title: 'Classes',
    icon: 'https://ssl.gstatic.com/classroom/favicon.png',
    name: 'Google Classroom'
  },
  drive: {
    title: 'My Drive - Google Drive',
    icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    name: 'Google Drive'
  },
  docs: {
    title: 'Untitled document - Google Docs',
    icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    name: 'Google Docs'
  },
  canvas: {
    title: 'Dashboard - Canvas',
    icon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
    name: 'Canvas LMS'
  },
  desmos: {
    title: 'Desmos | Graphing Calculator',
    icon: 'https://www.desmos.com/favicon.ico',
    name: 'Desmos Calculator'
  },
  wikipedia: {
    title: 'Ancient Egypt - Wikipedia',
    icon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
    name: 'Wikipedia'
  }
};

export function applyCloak(preset) {
  const config = CLOAK_CONFIGS[preset] || CLOAK_CONFIGS.none;
  document.title = config.title;

  let link = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = config.icon;

  try {
    localStorage.setItem('active_cloak', preset);
  } catch (e) {}
}

export function getInitialCloak() {
  try {
    const saved = localStorage.getItem('active_cloak');
    if (saved && CLOAK_CONFIGS[saved]) {
      return saved;
    }
  } catch (e) {}
  return 'none';
}
