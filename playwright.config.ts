import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  forbidOnly: !!process.env.GITHUB_ACTION,
  fullyParallel: false,
  reporter: process.env.GITHUB_ACTION ? 'blob' : 'html',
  retries: process.env.GITHUB_ACTION ? 2 : 0,
  testDir: './tests/Playwright',
  tsconfig: './tsconfig.json',
  use: {
    baseURL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  workers: 1,

  // browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read', 'clipboard-write'],
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // test against branded browsers.
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
})
