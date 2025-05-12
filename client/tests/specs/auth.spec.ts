import { expect, test } from '#tests/index'

test.describe('auth', () => {
  test('log in and out', async ({ app, page }) => {
    const user = await app.user()

    await app.goto('/login')
    await page.getByTestId('email').fill(user.email)
    await page.getByTestId('password').fill('password')
    await page.getByTestId('submit').click()
    await page.waitForURL('/')
    await expect(page.getByTestId('user')).toContainText(user.email)
    await page.getByTestId('logout').click()
    await expect(page.getByTestId('user')).not.toContainText(user.email)
  })
})
