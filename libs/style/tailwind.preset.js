const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{css,html,ts}', './libs/**/*.{css,html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
