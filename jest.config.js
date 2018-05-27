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
  moduleNameMapper: {
    '@fflamingo/(.*)': '<rootDir>/packages/$1/src/'
  },
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['packages/**/src/**/*.{js,jsx,ts,tsx}']
};
