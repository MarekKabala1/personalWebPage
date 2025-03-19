export type RetroTheme = 'win95' | 'mac-os-9' | 'web-1999' | 'dark-retro';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  link: string;
  border: string;
  accent?: string;
}

const themeConfigs: Record<RetroTheme, ThemeColors> = {
  'win95': {
    primary: '#c0c0c0',
    secondary: '#000080',
    background: '#008080',
    text: '#000000',
    link: '#0000FF',
    border: '#dfdfdf #404040 #404040 #dfdfdf'
  },
  'mac-os-9': {
    primary: "#d4d4d4",
    secondary: "#808080",
    background: "#ffffff",
    text: "#000000",
    link: "#0000ee",
    border: "#000000"
  },
  'web-1999': {
    primary: '#ffff00',
    secondary: '#ff00ff',
    background: '#000066',
    text: '#1a1b1c',
    link: '#00ff00',
    border: '#ff0000'
  },
  'dark-retro': {
    primary: '#1a1b1c',
    secondary: '#32a852',
    background: '#0f1012',
    text: '#8bac0f',
    link: '#9bbc0f',
    border: '#306230',
    accent: '#4a8c4a'
  }
};

export const setTheme = (theme: RetroTheme) => {
  localStorage.setItem('retroTheme', theme);
  applyTheme(theme);
};

export const getTheme = (): RetroTheme => {
  return (localStorage.getItem('retroTheme') as RetroTheme) || 'win95';
};

export const applyTheme = (theme: RetroTheme) => {
  const root = document.documentElement;
  const colors = themeConfigs[theme];

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });

  // Add theme-specific classes
  root.classList.remove('theme-win95', 'theme-mac-os-9', 'theme-web-1999', 'theme-dark-retro');
  root.classList.add(`theme-${theme}`);
};