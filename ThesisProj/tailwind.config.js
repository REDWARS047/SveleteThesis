/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}', // Include all Svelte, JS, TS, and HTML files in src directory
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', // Include Flowbite Svelte components
  ],
  theme: {
    extend: {
      // Customize your theme here if needed
    },
  },
  plugins: [
    // Add any plugins you need, such as the Flowbite plugin
    require('flowbite/plugin'),
  ],
}
