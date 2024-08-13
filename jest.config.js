module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  // extensionsToTreatAsEsm: ['.mjs'],
};
