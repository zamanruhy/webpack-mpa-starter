# Webpack Multi Page App Starter

Opinionated multiple page application setup with Webpack. Fully customizable.
Powered by svelte.

## Quick start

To create a new project based on this template using
[degit](https://github.com/Rich-Harris/degit):

```
npx degit zamanruhy/webpack-mpa-starter my-app
```

Move to the directory:

```
cd my-app
```

Install the dependencies:

```
npm install
```

Then start webpack:

```
npm run dev
```

## Features

- **[SCSS](https://github.com/sass/node-sass) stylesheets preprocessing**

  - `_variables.scss` with settings for fonts, colors, breakpoints, layout,
    grid, z-indexes and others
  - `_mixins.scss` with useful mixins, e.g. responsive mixins:

    ```scss
    .selector {
      @include up(lg) {
        display: grid;
      }
      @include down(md) {
        display: flex;
      }
    }
    ```

    where `lg`, `md` (and `sm`, `xl`) are breakpoint keys configured in
    `_variables.scss`

  - `_functions.scss` with useful functions
  - all three of the above files (combined in `settings.scss`) are automatically
    imported into every scss file

- **[PostCSS](https://github.com/postcss/postcss) stylesheets postprocessing**

  - [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) converts px to
    rem (disabled by default, to enable go to postcss.config.js)
  - [autoprefixer](https://github.com/postcss/autoprefixer) adds vendor prefixes
    automatically

- **[EJS](https://github.com/difelice/ejs-loader) template engine is used**

  - Usage of components:

    ```ejs
    <%
      const header = require('@/components/header/header.ejs')
    %>

    ...

    <%= header() %>
    ```

  - Usage of assets:

    ```ejs
    <img src="<%= require('./path/to/image.jpg') %>" alt="#">
    ```

  - For specific layout set `global.layout` at the top of page template:

    ```ejs
    <%
      global.layout = 'simple'
    %>
    ```

    and `simple.ejs` will be picked up from `src/pages/layout` instead of
    `base.ejs`

- **SVG sprite generating using
  [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)**

  From svg files in `src/assets/svg` will be generated `sprite.svg`.

  Use through predefined `icon` component:

  ```ejs
  <%
    const icon = require('@/components/icon/icon.ejs')
  %>

  ...

  <%= icon({ name: 'close' }) %>
  ```

  where the `name` prop corresponds to the name of the svg file.

  The output will be:

  ```html
  <svg class="icon icon_close" style="height: 1em; width: 1.3em">
    <use xlink:href="static/img/sprite.svg#icon-close"></use>
  </svg>
  ```

- **Image optimization using
  [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)**

- **Powered by [Svelte](https://svelte.dev/) UI framework**

  - Ready to use svelte components are placed in` src/components/common`

  - Svelte components can be mapped to custom elements in
    `src/custom-elements.js` via `src/utils/custom-element.js`

  - Svelte state manager can be used across project if needed (`src/store`
    directory)

## File structure

```
└─ dist/                   # built files
└─ public/                 # files to copy as-is
└─ src/                    # source files
  └─ actions/              # svelte actions
  └─ assets/               # asset files
    └─ fonts/              # fonts
    └─ img/                # images
    └─ scss/               # styles
    └─ svg/                # svg icons
  └─ components/           # components
    └─ common/             # svelte components
    └─ icon/               # predefined icon component
    └─ component/          # component
        ├─ component.ejs   # component template (import in any template)
        ├─ component.js    # component script (import in main.js if needed)
        ├─ component.scss  # component styles (no need to import manually)
  └─ helpers/              # helpers
  └─ pages/                # page templates
  └─ store/                # svelte store
  └─ utils/                # utils
  ├─ custom-elements.js    # svelte to ce mapping
  ├─ data-attributes.js    # data attributes
  ├─ main.js               # entry file
└─ webpack/                # webpack files
├─ .babelrc                # config for babel
├─ .eslintrc.js            # config for eslint
├─ .prettierrc             # config for prettier
├─ package.json            # basic dependencies
├─ postcss.config.js       # config for postcss
...
```

## Commands

`npm run dev` - start a development server on localhost

`npm run build` - create a production build in the dist folder

`npm run build:analyze` - create a production build and analyze bundle

`npm run build:serve` - create a production build and start server on localhost

`npm run lint` - run eslint on project files

`npm run prettify` - run prettier on project files

`npm run add-comp example` - create a new folder in src/components with 3 files
inside (example.ejs, example.js, example.scss)
