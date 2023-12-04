<p align="center" width="100%">
    <img width="25%" src="./ZouJS.png">
</p>

# Zou!JS

*— Zou! is a french interjection that stands for: JustDoIt! GoAhead!*

A simple and easy to understand SSG setup, with close to zero configuration or dependencies but flexible enough to craft web projects or fire a quick sandbox and try things from a curated list of CDN's, Macros & Mixins. 

We can explore, build awesome projects and have quite some fun with "simple things" and web standards.

## Install. Scaffold from CLI or Use the template on Github

Two diferent ways to start a Zou!JS project:

### [zoucli](https://www.npmjs.com/package/zoucli), the npx interactive CLI


```
npx zou create myWebsite
```

### The prompt will ask:

<details>
  <summary>Author:</summary>
  <p>Defaulting to the great *DevMysterio*, here you obviously answer with your author name, for the package.json field.</p>
</details>

<details>
  <summary>What CSS flavor?</summary>
  <p>A select prompt will make you chose between SCSS and Tailwind setups. On top of the SCSS one, OpenProps is also integrated, and managing the Dark/Light theming.</p>
</details>

<details>
  <summary>What Scripting?</summary>
  <p>The choice here is between Javascript or Typescript. The Javascript is processed by ESBuild and optimised for production when ready. Hyperscript provides the interactivity (and some fun). On the side of Typescript, it's simply a main.ts as souce, tsconfig file and TSC compile NPM scripts.</p>
</details>

<details>
  <summary>Play with some CDN</summary>
  <p>Pick (By pressing the Spacebar!)one or more CDNs like ChotaCSS, Bootstrap, AlpineJS, PocketBase, htmX (I know), from zouMacros package. You can also add/remove them easily afterwards by adding/removing things like `{{ cdn.pkg('bulma')}}` in the head section of a layout.</p>
</details>

<details>
  <summary>Open in VSCode?</summary>
  <p>You can answer 'Nope' at that prompt and procede with NeoVim or hardcore Vi, but if you're using VSCode, Zou! will try to "code ." and open your project folder while installing the packages.</p>
</details>

<details>
  <summary>Install packages Now?</summary>
  <p>This Y/n prompt—if Y—will make Zou! move into `myWebsite` where all the files & folders were generated, open the folder in VSCode, launch an `npm install` then fire the dev server with `npm run dev` automatically when ready. Sit back & enjoy.</p>
</details>

To update the tool to the newest version:

`npm install -g zoucli`


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
  "showdown": "^2.1.0",
  "alive-server": "^1.3.0",
  "copyfiles": "^2.4.1",
  "npm-run-all": "^4.1.5",
  "onchange": "^7.1.0",
  "directory-tree": "^3.5.1",
  "html-frontmatter": "^1.6.1",
  "lodash": "^4.17.21",

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

| -Folder- | -Purpose-    |
| --- | --- |
| **Bin:** | db.js will scan files and create an object from the Frontmatters |
| **Data:** | Add data in .js / load in zou.config.js / use in .njk templates |
| **Layouts:** | General .njk templates, composed with partials and more |
| **Macros:** | Styled components, functionalities, (many possibilities) |
| **Pages:** | Extending a layout. The main element with dynamic content |
| **Partials:** | Sub-pages to be included in others |
| **Scripts:** | The enty points for the .js or .ts files |
| **Static:** | Assets to be copied to public, generally images |
| **Styles:** | SCSS / Tailwind. Whatever flavor you like |



## Pages database file auto-generated from frontmatter

On `npm run dev`, `npm run build` or directly from the root with `node bin/db`, Zou! will scan the /public folder for .html pages, and transform the HTML-frontmatter into the 'pages' object, stored and exporterd from /src/data/db.js

- Each frontmatter object expecting at least 'title' and 'url' (here the date is a timestamp for now) [https://timestamp.online/](https://timestamp.online/)

  ```markup
  <!-- src/pages/blog/article-one/index.njk -->
  {% block frontMatter %}
  title: Article One
  url: /blog/article-one
  date: 1701621848
  tags: [one, two, racoon]
  {% endblock %}
  ```
  
- becomes an entry in the pages object

    ```javascript
  // src/data/db.js
  module.exports.pages = [
    {
      "title": "Article One",
      "url": "/blog/article-one",
      "date": 1701621848,
      "tags": [
        "one",
        "two",
        "racoon"
      ]
    }
  ]
  ```

- then is injected into the 'data' object for .njk files
  
```javascript
  // zou.config.js
  
  /* Import Data file*/       
  const db = require('./src/data/db.js');
  
  /* Create the data object */
  const data = {
    appName: 'myWebsite',
    pages: db.pages,
 };     
```

## Collections and more via custom Nunjucks filters

<details>
  <summary><strong>urlInc('blog/') : </strong>  Collection of any page where the 'url' field includes a pattern</summary>
  <p>Usage: <code>{% for post in data.pages | urlInc('blog/') %}...</code> Then inside we have access to {{ post.title }}, {{ post.url }}... We  can nest the related tags if they exists, with something like <code>{% for tags in post.tags %}...</code> from inide the first loop. It can be virtually anything, as long as it can find some matching results.</p>
</details>

<details>
  <summary><strong>urlIs('/blog/article-one') : </strong>  Extracting the frontmatter data of a signle page</summary>
  <p>Usage: <code>{% for page in data.pages | urlIs('/') %}...</code> It can wrap everyting inside the {% block main %} and give acces to things like related categories/tags, or whatever else usefull from the frontmatter. A classic example would be blog posts pages files.</p>
</details>

<details>
  <summary><strong>limitFromTo(0, 5) : </strong>  Limitintg the results we recieve from *data.pages*</summary>
  <p>Usage: <code>{% for page in data.pages | limitFromTo(0, 5) %}...</code> will produce an array with the first 5 elements. To offset the list, obviously go for a grater than zero starting point</p>
</details>

<details>
  <summary><strong>reverse : </strong>  Builtin Nunjuck handy filter</summary>
  <p>Usage: <code>{% for pages in data.pages | reverse %}...</code> just that. The array, in reverse, newest first.</p>
</details>

<details>
  <summary><strong>SuperCombo : </strong>  The 5 most recent posts :)</summary>
  <p>Usage: <code>{% for posts in data.pages | reverse | urlInc('blog/') | limitFromTo(0, 5) %}...</code> Easy.</p>
</details>

<details>
  <summary><strong>tags : </strong>  A pre-filtered list of uniques tags</summary>
  <p>Usage: <code>{% for tag in tags %}<a href="/posts-about/{{ tag }}">{{ tag }}</a>{% endfor %}</code> It exctracts uniques occurences from the `tags: [one, two, racoon]` lines in the frontmatters.</p>
</details>

<details>
  <summary><strong>withTag('racoon') : </strong>  Collection of all pges having a word in their `tags`</summary>
  <p>Usage: <code>{% for posts in data.pages | withTag('racoon') %}...</code> This can create the lists of posts on pages like `/posts-about/racoon` so a visitor could see when clicking on a tag link.</p>
</details>

## Navigation

Navigation lists of links are stored in `src/data/nav.js` like the navMain block:

```javascript
// src/data/nav.js
module.exports.navMain = [
  {
    url: "/",
    label: "Home",
  },
  {
    url: "/blog",
    label: "Blog",
  },
];
```

Then made available to the temlates in `zou.config.js` 

```javascript
// zou.config.js

/* Import Data file*/       
const nav = require('./src/data/nav.js');

/* Add to the data object */
const data = {
  appName: 'myWebsite',
  navMain: nav.navMain,
};     
```

That way, in any template or partial like a header, we can just:

```
// someFile.njk

<ul>
{% for link in navMain %}
  <li><a href="{{ link.url }}">{{ link.label }}</a></li>
{% endfor %}
</ul>
};     
```

We can duplicate the block in `src/data/nav.js` and repeat the rest of the steps, to create things like `navFooter`, `navSocials` or whatever other list.


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

A custom Nunjucks filter using the [Showdown](https://showdownjs.com/docs/markdown-syntax/) library was added in config.js converting a variable from md to html. *So we can:*

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


