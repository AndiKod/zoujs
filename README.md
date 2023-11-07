<p align="center" width="100%">
    <img width="25%" src="./Zou!.png">
</p>

# Zou!JS

*— Zou! is a french interjection that stands for: JustDoIt! GoAhead!*

Simple, modular and light StaticSiteGenerator built around NPM Scripts like a tasks runner. Write HTML/Nunjucks/Markdown, CSS/SASS/Tailwind, JS/TS in /src and everyting is compiled on the fly & served on localhost:3000 from /public. 

The static site in the /public folder is fully rendered at built time from the layouts, partials and interactive templates for improved SEO and more. Folders and files names are totally customisable in the package.json scripts section, so use the defaults or create your own Zou! flavour.

----

Back in the days of PHP, when the cool kids used to implement Smarty or Twig templating just to do `{{ var }}` instead of the native `<?= $var ?>` some devs asked: "Why would you want to use a whole templating library, while PHP can do it natively?". SASS, Tailwind, TypeScript... many tools we are using, ship with their simple CLI tool doing the basic of what we need when designing a website.

For many projects ...web Standards HTML/CSS/JS and AlpineJS sugar, eventually a database backend like SupaBase or PocketBase will be enough, straight forward to implement, free to deploy on Vercel/Netlify/etc, and won't get you stuck with "the X way to do things" and dependencies hell.

## Install

The classic, clone / install / run.

`git clone git@github.com:AndiKod/zou.git`

`cd zou && npm i && npm run dev`


## Default Scripts & Packages

By default it does "everything", so eventually keep only what you're using in your actual project. 

```
"scripts": {
    "b-sass": "sass  --no-source-map src/styles/sass:public/css --style compressed",
    "b-css": "postcss src/styles/css/input.css -o public/css/outcss.css",
    "b-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/css/tw.css --minify",
    "b-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --minify",
    "b-ts": "tsc src/scripts/main.ts --outFile public/tscript.js",
    "b-pages": "nunjucks-to-html --baseDir src/pages",

    "w-pages": "onchange \"./src/**/*\" -- npm run b-pages",
    "w-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --watch",
    "w-ts": "tsc src/scripts/main.ts --outFile public/tscript.js --pretty --watch",
    "w-sass": "sass  --no-source-map --watch src/styles/sass:public/css",
    "w-css": "postcss src/styles/css/input.css -o public/css/outcss.css --watch",
    "w-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/css/tw.css --watch",

    "c-static": "copyfiles -u 1 \"./src/static/**/*\" \"public\"",
    
    "serve": "browser-sync start --server public --files public",
    "copy": "npm-run-all --parallel c-*",
    "watch": "npm-run-all --parallel w-*",
    "build": "npm-run-all copy --parallel b-*",
    "dev": "npm-run-all copy b-pages --parallel watch serve"
  },
  ```
The full list of all flavors. If you go with just JS/Tailwind the devDependencies list would be even shorter. Core (the first block) + Tailwind. But frankly ...have some SCSS or modern CSS fun ;)

  ```
  "dependencies": {
    "alpinejs": "^3.13.2",
  },
  "devDependencies": {
    
    "nunjucks-to-html": "^1.1.0",
    "cli-markdown": "^3.0.5",
    "browser-sync": "^2.29.3",
    "copyfiles": "^2.4.1",
    "npm-run-all": "^4.1.5",
    "onchange": "^7.1.0",

    "tailwindcss": "^3.3.5",
    "@tailwindcss/typography": "^0.5.10",

    "sass": "^1.69.5",

    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16",
    "postcss-cli": "^10.1.0",
    "postcss-import": "^15.1.0",
    "postcss-preset-env": "^9.3.0",
    "precss": "^4.0.0",
    "cssnano": "^6.0.1",

    "typescript": "^5.2.2"
  }
  ```

  


## Default Folders

Zou! works "out of the box" with a simple folders convention in /src.

- **Layouts:** Genral template
- **Macros:** Styled UI components
- **Pages:** Extending a layout
- **Partials:** Sub-pages to be included
- **Scripts:** JS/TS
- **Static:** Assets to be copied to public
- **Styles:** Vanilla CSS (PostCSS)/SCSS/Tailwind

but feel free to customise it to your liking and needs.


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

Each .njk template from `src/pages` will compile to /public along with it's path. So, `src/pages/about/index.njk` =willBe=> `public/about/index.html`.

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
{% set myText = "

## Some article title

Lorem [ipsum](https://ipsum.org) thing.

" %}{{ myText | md|safe }}
```

That way the markup will be rendered at build time and search engines crawlers will find real html & text instead of and empty div with an #id ...waiting to be filled with some innerHTML.


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

The things that don't change but need to be copied in the /public root, like the favicon. The copy action is performed at `npm run start` command invocation.

### Styles

Several ways to do things...

#### Vanilla (PostCSS) 

[PostCSS](https://postcss.org/) is giving super-powers to the css inside `src/styles/css/input.css` via some plugins, listed in postcss.config.js

We have [Autoprefixer](https://github.com/postcss/autoprefixer) for automatic vendor-prefixes, modern CSS via [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env), SASS-like syntax provided by [PreCSS](https://github.com/csstools/precss), [postcss-import](https://github.com/postcss/postcss-import) for things like `@import 'vars';` & [cssnano](https://github.com/cssnano/cssnano) for the minification.

Basically almost all the list from Brad Traversy's [PostCSS Crash Course](https://www.youtube.com/watch?v=SP8mSVSAh6s) video.

Place `<link rel="stylesheet" href="/css/outcss.css">` in the head section of a layout, and have fun with overpowered 'Vanilla' CSS.


#### SASS 

The NPM script will look inside the `src/styles/sass/` folder for the `input.scss` file as entry point. Everything inside the folder will be compiled to `public/css/outscss.css` to be loaded into the layout from there. The production version is compressed by the sass compiler.

For the rest, it's full SASS/SCSS passed trough the official CLI.

#### Tailwind

The entry point for [Tailwind](https://tailwindcss.com/docs/installation) is located in `src/styles/twinput.css` and the tailwind.config.js as usual in the root folder. Compiled styles can be included in layouts from `public/css/tw.css` optimised/minified. The [Typography](https://tailwindcss.com/docs/typography-plugin) module is installed, so you can just add `<article class=".prose">` to use it.


## Custom Filters

In addition to the already great list of [Builtin Filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters) we can add [custom ones](https://mozilla.github.io/nunjucks/api.html#custom-filters) if needed or 'for the fun of it'.

Registering it in `nunjucks.config.js` from the root folder, inside the `beforeRender()` block:

```javascript
beforeRender (nunjucksEnv, renderName, renderData) { 
  let nunjucks = this;   

  env.addFilter('shorten', function(str, count) {
    return str.slice(0, count || 5);
  });
  
},
```

It will print out only the first x characters, or 5, from a variable or a block in a page:

```nunjucks
{# Show the first 5 characters #}
A message for you: {{ message|shorten }}

{# Show the first 20 characters #}
A message for you: {{ message|shorten(20) }}

{# Show the first 10 characters #}
{{ filter shorten(10) }}
Lorem ipsum dolor sit amet
{{ endfilter }}

```




... that's all for the moment :)
