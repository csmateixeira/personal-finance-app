/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // primary colors
        'beige-500': '#98908B',
        'beige-100': '#F8F4F0',
        'grey-900': '#201F24',
        'grey-500': '#696868',
        'grey-300': '#B3B3B3',
        'grey-100': '#F2F2F2',

        // secondary colors
        'green': '#277C78',
        'yellow': '#F2CDAC',
        'cyan': '#82C9D7',
        'navy': '#626070',
        'red': '#C94736',
        'purple': '#826CB0',

        // other colors
        'purple-light': '#AF81BA',
        'turquoise': '#597C7C',
        'brown': '#93674F',
        'magenta': '#934F6F',
        'blue': '#3F82B2',
        'navy-grey': '#97A0AC',
        'army-green': '#7F9161',
        'gold': '#CAB361',
        'orange': '#BE6C49',
      },
      fontFamily: {
        'public-sans': ['Public Sans', 'sans-serif']
      },
      fontSize: {
        'preset1': ['32px', {
          lineHeight: '120%',
          letterSpacing: '0px',
          fontWeight: 'bold',
        }],
        'preset2': ['20px', {
          lineHeight: '120%',
          letterSpacing: '0px',
          fontWeight: 'bold',
        }],
        'preset3': ['16px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'bold',
        }],
        'preset4': ['14px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'regular',
        }],
        'preset4-bold': ['14px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'bold',
        }],
        'preset5': ['12px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'regular',
        }],
        'preset5-bold': ['12px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'bold',
        }],
      }
    },
  },
  plugins: [],
}

