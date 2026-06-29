/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {files: '*.astro', options: {parser: 'astro'}},
    {files: '*.svg', options: {parser: 'html'}}
  ],
  semi: false,
  singleQuote: true,
  bracketSpacing: false,
  proseWrap: 'always',
  trailingComma: 'none',
  quoteProps: 'consistent',
  arrowParens: 'avoid'
}
