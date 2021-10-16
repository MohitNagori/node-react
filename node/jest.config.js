require('dotenv').config({
  path: '.env.test',
})

module.exports = {
  restoreMocks: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test).+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
