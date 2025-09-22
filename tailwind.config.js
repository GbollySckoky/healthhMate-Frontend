/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../healthmate-admin/app/**/*.{ts,tsx}',
    // './healthmate-admin/lib/**/*.{ts,tsx}',
    '../healthmate-admin/components/**/*.{ts,tsx}',
    // Add any other paths where you use Tailwind classes
    // './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          900: 'var(--red-900)',
          800: 'var(--red-800)',
          700: 'var(--red-700)',
          600: 'var(--red-600)',
          200: 'var(--red-200)',
          100: 'var(--red-100)',
          50: 'var(--red-50)',
          10: 'var(--red-10)'
        },
        green:{
          900: 'var(--green-900)',
          800: 'var(--green-800)',
          100: 'var(--green-100)',
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
          50:  'var(--grey-50)',
          30:  'var(--grey-30)',
          20:  'var(--grey-20)',
          10:  'var(--grey-10)',
        },
        blue:{
          900: 'var(--blue-900)',
          200: 'var(--blue-200)',
          100: 'var(--blue-100)',
          50: 'var(--blue-50)'
        },
        purple:{
          900: "var(--purple-900)"
        },
        orannge:{
          900: 'var(--orange-900)',
          400: 'var(--orange--400)',
          200: 'var(--orange-200)'
        },
        pink:{
        600: 'var(--pink-600)',
        },
        lightGray: '#d1d5db', // Define your custom color
        black: 'var(--black)',
        healthBlack:'var(--health-black)',
        borderColor: 'var(--borderColor)',
        borderColor100: 'var(--borderColor--100)'
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

