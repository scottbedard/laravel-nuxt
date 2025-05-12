import type { Page } from '@playwright/test'
import type { User } from '@/types'

interface CreateOptions {
  count?: number
  load?: string[]
  state?: string[]
}

function timestamp(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

function url(path: string) {
  return `${process.env.APP_URL}/api/${path}`
}

export default class App {
  public readonly page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Execute an artisan command
   */
  async artisan(command: string, parameters: Record<string, unknown> = {}) {
    return await this.page.request.post(url('__playwright__/artisan'), {
      data: { _token: await this.csrfToken(), command, parameters },
      headers: { Accept: 'application/json' },
    })
  }

  /**
   * Create a user and log them in
   */
  async auth(attributes: Partial<User> = {}) {
    const user = await this.user(attributes)
    await this.login(user)

    return user
  }

  /**
   * Check if user is authenticated
   */
  async authenticated() {
    return (await this.currentUser()) !== null
  }

  /**
   * Create a model
   */
  async create<T = unknown>(model: string, attributes: Record<string, unknown> = {}, options: CreateOptions = {}) {
    const response = await this.page.request.post(url('__playwright__/factory'), {
      data: {
        _token: await this.csrfToken(),
        attributes,
        count: options?.count,
        load: options?.load,
        model,
        state: options?.state,
      },
      headers: { Accept: 'application/json' },
    })

    return await response.json() as T
  }

  /**
   * CSRF token
   */
  async csrfToken(page?: Page) {
    const _page = page ?? this.page

    const response = await _page.request.get(url('__playwright__/csrf-token'), {
      headers: { Accept: 'application/json' },
    })

    return await response.json()
  }

  /**
   * Get the current user
   */
  async currentUser() {
    const response = await this.page.request.post(url('__playwright__/current-user'), {
      data: { _token: await this.csrfToken() },
      headers: { Accept: 'application/json' },
    })

    const body = await response.text()

    if (!body) {
      return null
    }

    return await response.json() as User
  }

  /**
   * Go to a page and wait for hydration to finish
   */
  async goto(path: string) {
    await this.page.goto(path)

    await this.page.waitForFunction(() => window.useNuxtApp?.()?.isHydrating === false)
  }

  /**
   * Log in
   */
  async login(attributes?: Partial<User>, page?: Page) {
    const _attributes = attributes ?? await this.user()
    const _page = page ?? this.page

    const response = await _page.request.post(url('__playwright__/login'), {
      data: { _token: await this.csrfToken(_page), attributes: _attributes },
      headers: { Accept: 'application/json' },
    })

    return await response.json()
  }

  /**
   * Log a user out
   */
  async logout(page?: Page) {
    const _page = page ?? this.page

    const response = await _page.request.post(url('__playwright__/logout'), {
      data: { _token: await this.csrfToken() },
      headers: { Accept: 'application/json' },
    })

    return await response.text()
  }

  /**
   * Current datetime string
   */
  now() {
    return timestamp(new Date())
  }

  /**
   * Execute arbirary PHP code
   */
  async php(command: string) {
    const response = await this.page.request.post(url('__playwright__/run-php'), {
      data: { _token: await this.csrfToken(), command },
      headers: { Accept: 'application/json' },
    })

    const json = await response.json()

    return json.result ?? json
  }

  /**
   * Refresh the database
   */
  async refreshDatabase(parameters: Record<string, unknown> = {}) {
    return this.artisan('migrate:fresh', parameters)
  }

  /**
   * Create a user
   */
  async user(attributes: Partial<User> = {}, options: CreateOptions = {}) {
    return await this.create<User>('App\\Models\\User', attributes, options)
  }
}
