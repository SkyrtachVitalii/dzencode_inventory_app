// jest.config.ts

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transformIgnorePatterns: [
    '/node_modules/(?!(next-intl|use-intl|@formatjs|framer-motion)/)',
  ],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

export default createJestConfig(config)