/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // prefix: 'tw-',
  darkMode: 'class',
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [
    require("flowbite/plugin")
  ],
};