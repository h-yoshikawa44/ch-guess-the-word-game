/** @type {import("@markuplint/ml-config").Config} */
export default {
  extends: ['markuplint:recommended-static-html'],
  excludeFiles: ['./node_modules/**', './dist/**'],
};
