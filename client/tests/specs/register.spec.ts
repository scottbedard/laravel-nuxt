import { expect, test } from '#tests/index'
import { faker } from '@faker-js/faker'

test.describe('register', () => {
  test('register new user', async ({ app, page }) => {
    const email = faker.internet.email()

    await app.logout()
    await app.goto('/register')
    await page.getByTestId('email').fill(email)
    await page.getByTestId('password').fill('password')
    await page.getByTestId('submit').click()
    await page.waitForURL('/')
    await expect(page.getByTestId('user')).toContainText(email)
  })
})
