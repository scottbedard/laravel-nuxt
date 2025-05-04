import { expect, test } from 'playwright/index'

test.describe('example', () => {
  test('home page', async ({ app, page }) => {
    await app.refreshDatabase()

    const user = await app.auth()
    
    const response = await page.goto('/')
    const text = await response?.text()
    const status = response?.status()

    console.log({ text, status, user })

    
    await expect(page).toHaveTitle('laravel-nuxt')
    await expect(page.getByTestId('user')).toContainText(user.email)
  })
})