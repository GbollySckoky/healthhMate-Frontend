/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    '../doctor/app/**/*.{ts,tsx}',
    '../doctor/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			red: {
  				'10': 'var(--red-10)',
  				'50': 'var(--red-50)',
  				'100': 'var(--red-100)',
  				'200': 'var(--red-200)',
  				'600': 'var(--red-600)',
  				'700': 'var(--red-700)',
  				'800': 'var(--red-800)',
  				'900': 'var(--red-900)'
  			},
  			green: {
  				'100': 'var(--green-100)',
  				'800': 'var(--green-800)',
  				'900': 'var(--green-900)'
  			},
  			grey: {
  				'10': 'var(--grey-10)',
  				'20': 'var(--grey-20)',
  				'30': 'var(--grey-30)',
  				'50': 'var(--grey-50)',
  				'100': 'var(--grey-100)',
  				'200': 'var(--grey-200)',
  				'300': 'var(--grey-300)',
  				'400': 'var(--grey-400)',
  				'500': 'var(--grey-500)',
  				'600': 'var(--grey-600)',
  				'700': 'var(--grey-700)',
  				'800': 'var(--grey-800)',
  				'900': 'var(--grey-900)'
  			},
  			blue: {
  				'50': 'var(--blue-50)',
  				'100': 'var(--blue-100)',
  				'200': 'var(--blue-200)',
  				'900': 'var(--blue-900)'
  			},
  			purple: {
  				'900': 'var(--purple-900)'
  			},
  			orannge: {
  				'200': 'var(--orange-200)',
  				'400': 'var(--orange--400)',
  				'900': 'var(--orange-900)'
  			},
  			pink: {
  				'600': 'var(--pink-600)'
  			},
  			lightGray: '#d1d5db',
  			black: 'var(--black)',
  			healthBlack: 'var(--health-black)',
  			borderColor: 'var(--borderColor)',
  			borderColor100: 'var(--borderColor--100)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			inter: 'var(--font-inter)',
  			lato: 'var(--font-lato)',
  			libre: 'var(--font-libre)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

