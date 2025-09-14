/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../healthmate-admin/app/**/*.{ts,tsx}',
    // './healthmate-admin/lib/**/*.{ts,tsx}',
    '../healthmate-admin/components/**/*.{ts,tsx}',
    // Add any other paths where you use Tailwind classes
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          900: 'var(--red-900)',
          800: 'var(--red-800)',
          100: 'var(--red-100)',
          50: 'var(--red-50)',
        },
        green:{
          900: 'var(--green-900)'
        },
        grey:{
          900: 'var(--grey-900)',
          800: 'var(--grey-800)',
          700: 'var(--grey-700)',
          600: 'var(--grey-600)',
          500: 'var(--grey-500)',
          400: 'var(--grey-400)',
          300: 'var(--grey-300)',
          200: 'var(--grey-200)',
          100: 'var(--grey-100)',
          10: 'var(--red-10)'
        },
        lightGray: '#d1d5db', // Define your custom color
        black: 'var(--black)',
        healthBlack:'var(--health-black)',
        borderColor: 'var(--borderColor)',

      },
      fontFamily: {
        'inter': 'var(--font-inter)',
        'lato': 'var(--font-lato)',
        'libre': 'var(--font-libre)',
        // Set default sans-serif to use Inter
        'sans': 'var(--font-inter)',
      }
    }
  },
  plugins: [],
}

