import { expect, test } from '#tests/index'

test.describe('account page', () => {
  test.beforeEach(async ({ app }) => {
    await app.logout()
  })

  test('change password', async ({ app, page }) => {
    await app.auth()
    await app.goto('/settings/account')

    await page.getByTestId('current-password').fill('password')
    await page.getByTestId('new-password').fill('new-password')
    await page.getByTestId('new-password-confirmation').fill('new-password')
    await page.getByTestId('update-password-button').click()

    await expect(page.getByTestId('current-password')).toHaveValue('')
    await expect(page.getByTestId('new-password')).toHaveValue('')
    await expect(page.getByTestId('new-password-confirmation')).toHaveValue('')

    const changed = await app.php(`
      return Hash::check('new-password', auth()->user()->password);
    `)

    expect(changed).toBe(true)
  })
})
