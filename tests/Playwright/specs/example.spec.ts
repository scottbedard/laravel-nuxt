import { expect, test } from 'playwright/index'

test.describe('example', () => {
  test('home page', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle('laravel-nuxt')
  })
})