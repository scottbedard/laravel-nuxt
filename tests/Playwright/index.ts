export { devices, expect } from '@playwright/test'
import { test as base } from '@playwright/test'
import App from './fixtures/app'

export const test = base.extend<{
  app: App
}>({
  app: async ({ page }, use) => await use(new App(page)),
})
