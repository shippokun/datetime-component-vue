module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'vue'],
  setupFiles: ['./test-setup.js'],
  testMatch: ['**/*.spec.{j,t}s?(x)'],
  collectCoverage: true
};
