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
        primary: '#3661EB',
        loginBg: '#F2F5FF',
        AdminBg: '#F4F6F8',

        // menu item
        menuItemHighlight: '#E3E9FC',
        menuItemTextColor: '#717171',

        // buttons
        editBtn: '#FAC300',
        removeBtn: '#F76464',
      },
    },
  },
  plugins: [],
};
