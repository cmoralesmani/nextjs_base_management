const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './'
})
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
module.exports = createJestConfig(customJestConfig)
