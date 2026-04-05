import neostandard from 'neostandard';

export default neostandard({
  env: ['browser'],
  files: ['js/**/*.js'],
  ignores: ['node_modules/**'],
  noJsx: true,
  noStyle: true,
});
