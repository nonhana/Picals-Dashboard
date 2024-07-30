import { extendTheme } from '@mui/joy/styles';
import { Inter, Source_Code_Pro } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: ['var(--joy-fontFamily-fallback)'],
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
});

const theme = extendTheme({
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#eff8ff',
          100: '#deefff',
          200: '#b6e0ff',
          300: '#75caff',
          400: '#2cafff',
          500: '#0090f0',
          600: '#0075d4',
          700: '#005dab',
          800: '#004e8d',
          900: '#064274',
        },
      },
    },
  },
});

export default theme;
