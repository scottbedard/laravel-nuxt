import { expect, test } from '#tests/index'

test.describe('example', () => {
  test('home page', async ({ app, page }) => {
    const user = await app.auth()

    await page.goto('/')

    // Log the page body's innerHTML
    const bodyHTML = await page.evaluate(() => document.body.innerHTML)
    console.log('Page body innerHTML:', bodyHTML)

    await expect(page.getByTestId('user')).toContainText(user.email)
  })
})
