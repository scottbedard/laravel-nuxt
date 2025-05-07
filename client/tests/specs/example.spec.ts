import { expect, test } from '#tests/index'

test.describe('example', () => {
  test('home page', async ({ app, page }) => {
    const user = await app.auth()

    await page.goto('/')

    console.log({ user })

    await expect(page.getByTestId('user')).toContainText(user.email)
  })
})
