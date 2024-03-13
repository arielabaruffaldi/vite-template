# HCI K3 App
Front end implementation of functional logic and deployment scripts for K3.

# Tech stack
- Building tool: Vite
- Pakcage Manager: npm
- State Management: React Context API (Zustand for lots of global state)
- Styling: Sass Modules
- Language: Typescript
- Code Structure - ESLint + Prettier
- Data Fetching: axios
- Unit/Integration: Vitest + React - Testing Library
- E2E Tests: Cypress
- Internalisation: Lingui

# Libraries (dependencies + (devDependencies))
- Styling: node-sass + classnames + (typed-scss-modules + sass)
- Data Fetching: axios
- Internalisation: @lingui/react + @lingui/cli + @lingui/core + @lingui/macro
- The document head changing: react-helmet-async


# How to
- npm run dev - to start a local development.
- npm run start-scss-typing - to start a scss typing.
- npm run build - to run a build.
- npm run lingui:all - to generate localization files.
- npm run lint:fix - to run formatting.
- ncu -u - to update to latest packages' versions. Please, do it periodically.
- npx depcheck - to check unused dependencies. Please, do it periodically.
- convert:img - to convert images using https://imagemagick.org

# Code standards & guidelines 
- import { config } from '@/config' - @/ should be use to import components on different levels
- import { RedirectRoute } from './RedirectRoute' ./ should be use to import components on the same level
- export * from './RootRoute'
- index.ts should be used and no-restricted-imports should be applied. 
- Styles should be merged like this
```
import classNames, { Argument } from 'classnames'

import styles from './{component}.module.scss'

interface Props {
    className?: Argumentn
}

 <div className={classNames(styles.class1, className, {
                [styles.modifier1]: size === Enum1.value1,
            })}

```

# Components structure
- Root
    - index.ts
    - Nested
        - .tsx
        - .test.ts
        - .module.scss
        - .module.scss.d.ts - autogenerate with start-scss-typing


# Components Library TOC
//TODO