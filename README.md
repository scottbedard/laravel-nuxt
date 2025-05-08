<p align="center">
<img src="https://raw.githubusercontent.com/laravel/art/refs/heads/master/laravel-logo.svg" width="120px" />
<img src="https://nuxt.com/assets/design-kit/icon-green.svg" width="120px" />
</p>

<p align="center">
<a href="https://github.com/scottbedard/laravel-nuxt/actions/workflows/build.yml" target="__blank"><img src="https://github.com/scottbedard/laravel-nuxt/actions/workflows/build.yml/badge.svg" alt="Build status"></a>
<a href="https://codecov.io/gh/scottbedard/laravel-nuxt"><img src="https://codecov.io/gh/scottbedard/laravel-nuxt/branch/monorepo/graph/badge.svg?token=weroiw630X" alt="Test coverage"></a>
<a href="https://laravel-nuxt.dev" target="__blank"><img src="https://img.shields.io/badge/demo-laravel--nuxt.dev-blue" alt="Demo application"></a>
<a href="https://laravel.com/docs/12.x/license" target="__blank"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>
</p>

## [`laravel-nuxt.dev`](https://laravel-nuxt.dev)

Welcome, to a highly oppinionated starting for [Laravel](https://laravel.com/) / [Nuxt](https://nuxt.com/) applications. Other notable tools include,

- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/)
- [Pest](https://pestphp.com/)
- [Docker Desktop](https://www.docker.com/)

More documentation to come.

## Application

The `api` directory contains a [Laravel Sail](https://laravel.com/docs/11.x/sail#main-content) application. You should [configure a shell alias](https://laravel.com/docs/12.x/sail#configuring-a-shell-alias).

[See how to install the api &rarr;](https://laravel.com/docs/12.x/sail#installing-sail-into-existing-applications)

The following can be used to deploy to [Laravel Cloud](https://cloud.laravel.com/).
Hopefully this is temporary, [an official API is in the works](https://cloud.laravel.com/docs/knowledge-base/monorepo-support).

```sh
# Unwrap api from mono-repo
mkdir /tmp/monorepo_tmp

# Step 2: Create an array with all subdirectories
repos=("api" "client")

# Step 3: Move all subdirectories to the temporary directory
for item in "${repos[@]}"; do
  mv $item /tmp/monorepo_tmp/
done

# Step 4: Move the desired subdirectory into root
cp -Rf /tmp/monorepo_tmp/api/{.,}* .

# Step 5: Remove the temporary directory
rm -rf /tmp/monorepo_tmp

# Deploy application
composer install --no-dev
```

## Client

The `client` directory contains a [Nuxt](https://nuxt.com/) application, and it's
required to have [Node.js](https://nodejs.org/) and [PNPM](https://pnpm.io/) on
your machine.

```sh
# install dependencies
pnpm install

# start dev server
pnpm dev

# build assets
pnpm build

# preview production
pnpm preview
```

Authentication is provided by [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum), and users [`nuxt-auth-sanctum`](https://manchenkoff.gitbook.io/nuxt-auth-sanctum) to manage cookies and CSRF protection. If you plan to use cookie-based authentication, the API and client applications must be on the same host.
