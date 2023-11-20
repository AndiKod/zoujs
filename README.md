<p align="center" width="100%">
    <img width="25%" src="./ZouJS.png">
</p>

# Zou!JS

*— Zou! is a french interjection that stands for: JustDoIt! GoAhead!*

A simple and easy to understand SSG setup, with close to zero configuration or dependencies but flexible enough to craft web projects or fire a quick sandbox and try things from a curated list of CDN's, Macros & Mixins. 

We can explore, build awesome projects and have quite some fun with "simple things" and web standards.

## Install. Scaffold from CLI or Use the template on Github

Two diferent ways to start a Zou!JS project:

### [zou-create](https://www.npmjs.com/package/zou-create), the npx CLI

From the terminal with nodejs installed:

`npx zou-create myWebsite`

The CLI will ask for the Author's name, css and scripting preferences then generate all needed folders and files. You can go inside and install the packages.

`cd myWebsite && npm install`

Open the folder in your favorite editor, then:

`npm run dev`


To update the tool to the newest version:

`npm install -g zou-create`

*PS: On some points, zou-create is more "bare bones" then the repository but will catch-up*

### Use the template on Github

Duplicating AndiKod/zou on Github will give you a starting point with [SCSS](https://sass-lang.com/documentation/), [ChotaCSS](https://jenil.github.io/chota/), [///_Hyperscript](https://hyperscript.org/docs/#basics), modern JS and the rest of [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) goodness. Pre-installed and easy to activate: [TailwindCSS](https://tailwindcss.com/docs/installation), or [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) if needed or curious about.

[zouMacros](https://github.com/AndiKod/zouMacros) and [zouMixins](https://github.com/AndiKod/zouMixins) are also included, with things like css/js CDN's loader, mixins libraries, as a beginning.

Things like SCSS theming and light/dark switching are included in the starting files. An example of i18n macro is also in the macros folder. Icons via [icongr](https://icongr.am/)

## Default Scripts & Packages

Starting config when duplicating the repository:

```
"scripts": {
    "w-pages": "onchange \"./src/**/*\" -- npm run b-pages",
    "w-sass": "sass  --no-source-map --watch src/styles/sass:public/css",
    "w-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --watch",

    "b-pages": "nunjucks-to-html --baseDir src/pages",
    "b-sass": "sass  --no-source-map src/styles/sass:public/css --style compressed",
    "b-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --minify",
    
    "c-static": "copyfiles -u 1 \"./src/static/**/*\" \"public\"",
    "c-root": "copyfiles -u 1 \"./src/*.ico\" \"./src/*.txt\" \"public\"",
    
    "watch": "npm-run-all --parallel w-*",
    "build": "npm-run-all copy --parallel b-*",
    "copy": "npm-run-all --parallel c-*",
    "serve": "alive-server public",
    "dev": "npm-run-all copy b-pages --parallel watch serve"
  },
  ```

### Activate Tailwind

Add the corresponding lines in the scripts list:

```
"scripts": {
  "w-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/css/tw.css --watch",
  "b-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/css/tw.css --minify",    
},
```

Uncomment things in the `tailwind.config.js` and `src/styles/tw-input.css` files.

### Play with TypeScript

If for any reason you want to do that, all it takes is adding:

```
"scripts": {
  "w-ts": "tsc src/scripts/main.ts --outFile public/tscript.js --pretty --watch",
  "b-ts": "tsc src/scripts/main.ts --outFile public/tscript.js",
},
```

Write inside `src/scripts/main.ts`, and load `tscript.js` in templates, or rename it.

------

### The packages


```
"dependencies": {},
"devDependencies": {
  
  "nunjucks-to-html": "^1.1.0",
  "cli-markdown": "^3.0.5",
  "alive-server": "^1.3.0",
  "copyfiles": "^2.4.1",
  "npm-run-all": "^4.1.5",
  "onchange": "^7.1.0",

  "tailwindcss": "^3.3.5",
  "@tailwindcss/typography": "^0.5.10",

  "sass": "^1.69.5",

  "postcss": "^8.4.31",
  "postcss-cli": "^10.1.0",
  "autoprefixer": "^10.4.16",
  "postcss-import": "^15.1.0",
  "postcss-preset-env": "^9.3.0",
  "cssnano": "^6.0.1",

  "typescript": "^5.2.2"
}
```


## Default Folders

Zou!JS works "out of the box" with a simple folders convention in /src.

- **Data:** Food for .njk loops & tags
- **Layouts:** Genral templates/html-skeletons 
- **Macros:** Styled components, functionalities,...
- **Pages:** Extending a layout. The content.
- **Partials:** Sub-pages to be included in others
- **Scripts:** The JavaScripts sits in here, or TS
- **Static:** Assets to be copied to public
- **Styles:** CSS or SCSS / Tailwind


### Layouts

General .njk layouts, plain HTML with placeholders for dynamically inserted data from the pages. See the [official Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html) for the full list of tags, logic, filters, ...

*Page title dynamically generated in the layout:*

```nunjucks
<title>{% block pageTitle %}{% endblock %} {{data.appName}}</title>
```

The `{{data.appName}}` value is passed via nunjucks.config.js in the root, the named block value will be set on each page that extends the layout.

*Partials and the main content block are included in the layout with:*

```nunjucks
{% include "src/partials/header.njk" ignore missing %}
{% block main %}{% endblock %}
{% include "src/partials/footer.njk" ignore missing %}
```

The *ignore missing* part prevent Nunjucks from throwing errors around if we reference missing partial.

### Macros

Using the native Nunjucks [macro](https://mozilla.github.io/nunjucks/templating.html#macro) custom tags, we can get something like re-usable UI Components.

*Some `src/macros/forms.html` file could have inside:*

```nunjucks
{# Form elements components #}
{# {% import "src/macros/forms.html" as form %} #}
{# {{ form.input("pass", type="password") }} #}

{% macro label(for, text) %}
  <label class="form-label"  for="{{for}}">{{ text }}</label>
  <!-- With Vanilla CSS -->
  <style>
    .form-label {
      font-weight: 600;
      color: #3e0923;
    }
  </style> 
{% endmacro %}

{% macro input(name, holder, value='', type='text') %}
  <!-- Or Tailwind classes -->
  <input type="{{type}}" name="{{name}}" placeholder="{{holder}}"
  value="{{ value | escape }}" id="{{name}}"
  class="mb-4 p-2 border border-gray-400 rounded w-full">
{% endmacro %}
```

...then, in a .njk page, import & use:

```nunjucks
{% import "src/macros/forms.html" as form %}

<form class="w-4/12 mx-auto">
  <section>
  {{ form.label("user", "Username") }}<br/>
  {{ form.input("user", value="") }} 
  </section>  
  <section>
  {{ form.label("pass", "Password") }}<br/>
  {{ form.input("pass", type="password") }}
  </section> 
</form>
```

### Pages

Each .njk template from `src/pages` will compiled to /public along with it's path. So, `src/pages/about/index.njk` =willBe=> `public/about/index.html`.

*In pages we just extend a layout, set the variables, and add the main content:*

```nunjucks
<!-- Layout -->
{% extends "src/layouts/base.njk" %}
<!-- Some variables for SEO -->
{% block pageTitle %} 👋 {% endblock %}

<!-- The actual body -->
{% block main %}
<main> 
  <p>Here goes the main content.</p>
</main>
{% endblock %}
```

#### Writing in Markdown

A custom Nunjucks filter using the [Marked](https://marked.js.org/#demo) library was added in config.js converting a variable from md to html. *So we can:*

```nunjucks
{# Set the variable with Markdown text #}
{% set myText = "Some **markdown** in here" %}

{# Render it as HTML with the filters #}
{{ myText | md|safe }}
```

Of course, it can span over several lines, like:

```nunjucks
{% set pageContent = "

## Some article title

Lorem [ipsum](https://ipsum.org) thing.

" %}
{{ pageContent | md|safe }}
```

It's not yet the most elegant implementation but it works and trying workarounds.


### Partials

Well, the partials folder :) Also .njk files, so we could have access to the templating, variables, etc.

On file change/save, the pages are re-built and reflected live by browser-sync.

### Scripts

One or another, your choice ;)

#### Javascript

Processed by ESBuild. Write modern JS in and let it do the rest.

```bash
npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --watch
```
[ESBuild Docs](https://github.com/evanw/esbuild#readme) on Github

#### TypeScript

With typescript installed as dev dependency  via `npm install typescript --save-dev` we can call the `npx tsc ` compiler. The simplest way is something like:

```bash
tsc src/scripts/main.ts --outfile public/tscript.js --watch
```
You can read the [tsc CLI Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) on the [Official TS Website](https://www.typescriptlang.org/)

For the moment the TypeScript part is experimantal, but can be a thing, either for learning purpose or using TS as main scripting language ...even when simply crafting websites.

### Static

The like images, that will be copied to public/static as they are. The favicon and txt files from the root folder are copied to the public/ root. The actions are performed at `npm run dev` command invocation or build.

### Styles

Several ways to do things...

#### SCSS 

The NPM script will look inside the `src/styles/sass/` folder for the `input.scss` file as entry point. Everything inside the folder will be compiled to `public/css/outscss.css` to be loaded into the layout from there. The production version is compressed by the sass compiler.

For the rest, it's full SASS/SCSS passed trough the official CLI.

#### Vanilla CSS ?

Just write it in `input.scss` and it will work. 

#### Tailwind

The entry point for [Tailwind](https://tailwindcss.com/docs/installation) is located in `src/styles/tw-input.css` and the tailwind.config.js as usual in the root folder. Compiled styles can be included in layouts from `public/css/tw.css` optimised/minified. The [Typography](https://tailwindcss.com/docs/typography-plugin) module is installed, so you can just add `<article class=".prose">` to use it.







## Changelog

##### 1.1.0

- The starting project have only a base config around SCSS/Chota/JS/Hyperscript and the rest is just pre-installated, and ready to be activated if needed.
- Example implementation of layouts/pages/partials/macros/theme-switcher/i18n/...
- npx CLI with zou-create to scaffold a new project from the terminal
- Some other things I'm forgetting about


