import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./apps/**/*.{js,ts,jsx,tsx,mdx}', './packages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        portal: {
          primary: '#0369A1',
          secondary: '#8f988a',
          foreground: '#94A3B8',
          'foreground-dark': '#1E293B',
          'default-border': '#e5e7eb',
          'primary-light': '#e3e8e3',
          'primary-text': '#d1dacc',
        },
        flights: {
          primary: '#0369A1',
          secondary: '#8f988a',
        },
        crews: {
          primary: '#0369A1',
          secondary: '#8f988a',
        },
        compensation: {
          primary: '#0369A1',
          secondary: '#8f988a',
        },
      },
    },
  },
};
export default config;
