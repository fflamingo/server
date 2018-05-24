module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'packages/.*\\.(test|spec)\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      skipBabel: true
    }
  },
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['packages/**/src/**/*.{js,jsx,ts,tsx}']
};
