/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/pages/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/items/**/*.{js,jsx,ts,tsx}',
    'src/shared/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c4e80',
        loginBg: '#F2F5FF',
        AdminBg: '#F4F6F8',

        // menu item
        menuItemHighlight: '#EFEFEF',
        menuItemTextColor: '#717171',

        // buttons
        editBtn: '#FAC300',
        removeBtn: '#F76464',
      },
    },
  },
  plugins: [],
};
