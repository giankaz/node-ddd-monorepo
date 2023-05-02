module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Blow lines are optional.
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 2000],
    'footer-max-line-length': [2, 'always', 100],
  },
};
