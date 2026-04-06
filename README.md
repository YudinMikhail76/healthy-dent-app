# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

**The first step is to create a ```.env```  file and add variables there. You can copy variables from the ```.env.example``` file**

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

# Файлова структура (спрощений FSD)

## Картинки
**/src/shared/assets/images** - глобальні картинки

## Іконки
**/src/shared/assets/icons** - іконки для компонентів
Використання у компонентах:
```
<template>
    <CloseIcon />
</template>

<script>
import CloseIcon from '@/shared/assets/icons/close.svg'
</script>
```
**/src/shared/assets/background** - специфічні іконки фону для ui компонентів

**/src/app/entities/{entityName}/ui** - реюзабельні компоненти із бізнес логікою

**/src/shared/ui** - реюзабельні компоненти без бізнес логіки

**/src/views** - компоненти верхнього рівня для сторінок

**/src/widgets** - великі ui блоки типу Header, Footer, Sidebar, Paragraphs



Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
