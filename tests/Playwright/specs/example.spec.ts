import { expect, test } from 'playwright/index'

test.describe('example', () => {
  test('home page', async ({ app, page }) => {
    await app.refreshDatabase()

    const user = await app.auth()

    console.log({ user })

    await page.goto('/')
    
    await expect(page).toHaveTitle('laravel-nuxt')
    await expect(page.getByTestId('user')).toContainText(user.email)
  })
})