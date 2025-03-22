// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Updated to the new PostCSS plugin
    autoprefixer: {}, // Still works as is
  },
};