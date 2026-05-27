import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        '3d-bg': '#e8e8e8',
        'panel-bg': '#fafafa',
        'furniture-highlight': '#ff9800',
        'collision-error': '#d32f2f',
      },
    },
  },
  plugins: [],
};

export default config;
