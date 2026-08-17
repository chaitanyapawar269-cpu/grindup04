export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#010b18',
          100: '#010b18',
          500: '#cb6332',
          600: '#cb6332'
        }
      }
    }
  },
  plugins: [],
};
