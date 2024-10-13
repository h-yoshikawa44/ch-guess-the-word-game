/** @type {import("markuplint").Config} */
export default {
  extends: ['markuplint:recommended-static-html'],
  excludeFiles: ['./node_modules/**/*.html'],
};
