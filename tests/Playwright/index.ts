import { test as base } from '@playwright/test'
import App from 'playwright/fixtures/app'

export {
  devices,
  expect
} from '@playwright/test'

export const test = base.extend<{
  app: App
}>({
  app: async ({ page }, use) => await use(new App(page)),
})
