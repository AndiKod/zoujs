<p align="center" width="100%">
    <img width="25%" src="./ZouJS.png">
</p>

# Zou! SSG

Scaffold a custom Zou! SSG project and more, with interactive prompts.

*— Prononced like 'zoo' or 'zu' in italian/romanian,...*<br>
*Zou! is a french interjection that stands for: JustDoIt! GoAhead! Let'sGo!*

Simple SSG with close to zero configuration, going back to the basics.

No JS framework, no mega-bundler, almost nothing new to learn beyond HTML, CSS, JS yet it does the job "out of the box" . #HaveFun


**NOTE:** This repo is the reproduction of a "SCSS/JS -full" version of Zou! generated with via **[Zou!CLI](https://www.npmjs.com/package/zoucli)** the terminal companion, *v1.4.2*.


| -Folder- | -Purpose-    |
| --- | --- |
| **Bin:** | db.js will scan files and create an object from the Frontmatters |
| **Docs:** | *-if enabled-* JS and SCSS docs websites will generate here. |
| **src/Data:** | Add data in .js / load in zou.config.js / use in .njk templates |
| **src/Layouts:** | General .njk templates, composed with partials and more |
| **src/Macros:** | Styled components, functionalities, (many possibilities) |
| **src/Pages:** | Extending a layout. The main element with dynamic content |
| **src/Partials:** | Sub-pages to be included in others |
| **src/Scripts:** | The enty points for the .js or .ts files |
| **src/Static:** | Assets to be copied to public, generally images |
| **src/Styles:** | SCSS (w/ subfolders partials) / Tailwind. Whatever flavor you like |
| **Tests** | *-if enabled-* A default folder for *thing.test.js* files, but it's up to you |

## Use this repo as a Template

Click the green button to start a new repo of your own. 

From there you can either edit the pages in the browser via something like [CodeSandbox](https://codesandbox.io/) then link it to [Vercel](https://vercel.com/)||[Netlify](https://www.netlify.com/) to deploy your website automatically on each commit. A CMS feeling without quitting the browser.

Or just clone your new repo on your machine as usual. That way, you won't have to mess with changing the remotes, creating a blank repo, etc.


## Scaffold a new Zou! project, the "one liner way"

From v1.4.0, simulating "yes" answers to the propmt, a core SCSS+JS project will be instantly created. The optional flag -vsc will open the folder in VSCode, so you could finish from there with your favorite package manager. Just `pnpm/yarn/npm i` then `run dev`. 

```
npx zou create myWebsite -y -vsc

// or first: npm i -g zoucli ...then:
zou create myWebsite -y -vsc
```

To scaffold an instant Tailwind & JS Zou! project:

```
zou create myWebsite -tw -vsc
```

The full machine with Jest testing, JS TypesChecking via JSDoc, HTML docs generation for both Javascript and SCSS via jsDoc and sassDoc, plus the rest of the Zou! features:

```
zou create myProject -full -vsc
```

For TypeScript, don't use any flag and anwser to the prompt ;)


## Talk to the prompt

No flags, just having a conversation:

```
zou create myWebsite
```

### Zou! will ask:

<details>
  <summary>Author:</summary>
  <p>Defaulting to the great *DevMysterio*, here you obviously answer with your author name, for the package.json field.</p>
</details>

<details>
  <summary>What CSS flavor?</summary>
  <p>Choices: <strong>SCSS</strong> or <strong>Tailwind</strong>. On top of the SCSS one, <a href="https://open-props.style/">OpenProps</a> is also integrated, and managing the Dark/Light theming. We can indeed go for just Vanilla CSS in the SCSS setup. For Bootstrap, Chota and more, just <code>{{ cdn.pkg('bootstrap')}}</code> in the layout's Head. <em><a href="https://github.com/AndiKod/zouMacros">see available packages</a></em></p>
</details>

<details>
  <summary>What Scripting?</summary>
  <p>Choices: <strong>Javascript</strong> or <strong>Typescript</strong>. The Javascript is processed by ESBuild and optimised for production when ready. <a href="https://hyperscript.org/docs/#basics">Hyperscript</a> provides the interactivity <em>(and some fun)</em>. On the side of Typescript, it's simply a main.ts as souce, tsconfig file and TSC compile NPM scripts.</p>
</details>

<details>
  <summary>Enable sassDoc generation?</summary>
  <p>Needs to be installed with `npm i -g sassdoc`. A setup for <strong><a href="http://sassdoc.com/getting-started/">sassDoc</a></strong>, generating a mini-website with scss documentation via code annotations. Add comments, types, todos in your SCSS, then `npm run docs` to generate.  Optional.</p>
</details>

<details>
  <summary>Enable JSDoc & TypesCheck?</summary>
  <p><strong><a href="https://jsdoc.app/">JSDoc</a></strong> brings TypesChecking to Vanilla JS, and great documentation. Two videos: <a href="https://www.youtube.com/watch?v=YK-GurROGIg">JSDoc Crash Course - Brad.Traversy</a> and <a href="https://www.youtube.com/watch?v=oH_-6TyxVhI">JSDoc TypesCheck in 15min - codeSTACKr</a>. Optional.</p>
</details>

<details>
  <summary>Enable JS Testing with Jest?</summary>
  <p>Unit tests with the awesome <strong><a href="https://jestjs.io/docs/getting-started">Jest</a></strong>. It will create a `tests` folder in the root, but you can organize as you want. When ready ... `npm run test`, or just `npm t`. Optional.</p>
</details>

<details>
  <summary>Open in VSCode?</summary>
  <p>You can answer 'Nope' at that prompt and procede with NeoVim or hardcore Vi, but if you're using VSCode, Zou! will "code ." and open your project folder.</p>
</details>

<details>
  <summary>Auto npm-install/run?</summary>
  <p>This would programatically use NPM to install packages, then run `npm run dev` in one go. It's nice but can be a few seconds longer than the other options.</p>
</details>


### Then will:

- Instantly create `myWebsite` folder
- ... and all needed files/folders inside.
- Go there with `cd myWebsite` and
- open in VSCode *(if asked for)*.

You can simply `pnpm/yarn/npm install then run dev` from inside `myWebsite`
  
- Install packages with `npm install` &
- launch `npm run dev` *(if asked for)*
- Open the project in the default browser.  

You're set and ready to rock! 




## Pages database auto-generated from frontmatter

On `npm run dev`, `npm run build` or directly from the root with `node bin/db`, Zou! will scan the /public folder for .html pages, and transform the HTML-frontmatter into the 'pages' object, stored and exporterd from /src/data/db.js

- Each frontmatter object expecting at least 'title' and 'url' (here the date is a timestamp for now) [https://timestamp.online/](https://timestamp.online/)

  ```
  <!-- src/pages/blog/article-one/index.njk -->
  {% block frontMatter %}
    title: Article One
    url: /blog/article-one
    date: 1701621848
    tags: [one, two, racoon]
  {% endblock %}
  ```
  
- becomes an entry in the pages object

    ```
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
  
    ```
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

Navigations lists of links are stored in `src/data/nav.js` like the navMain block:

```
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

Then made available to the templates in `zou.config.js` 

```
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


## SCSS Partials Subfolders 

From 1.3.0, the SCSS files are organized in subfolders, inspired by the official [7-1 pattern](https://sass-guidelin.es/#architecture), [Kevin Powell](https://www.youtube.com/watch?v=9Ld-aOKsEDk) and personnal preferences. The starting structure is:


```scss
  @use "abstract";
  @use "base";
  @use "components";
  @use "layout";
  @use "pages";
  @use "themes";
  @use "vendors";
  @use "utility";
  @use "freestyle";
```

The freestyle folder imports the _getWild.scss partial, for random stuff quickly thrown there while prototyping or for whatever reason. See it like the TypeScript's any:scss.

You can scaffold several Zou! projects, customize the SCSS folders and save them on github as starters with different structures.


## Scaffold a new Page

From a terminal, just call:

```
zou make:file
```

The prompt will ask:

<details>
  <summary>What type?</summary>
  <p>For the moment it will make you chose between Layout, Page or Partial. The goal is to have a quite complete scafold targets along the way.</p>
</details>

<details>
  <summary>Page</summary>
  <p>Zou! will ask for the title, the slug and the layout. Say you answer: About / about / base, it will create the `src/pages/about/index.njk` page, extending `src/layouts/base.njk`</p>
</details>

<details>
  <summary>Layout</summary>
  <p>Will ask for the layout's name (in slug format). Il will scaffold a layout boilerplate in `src/layouts/name.nkj`, with ///_Hyperscript and zouMacros included, plus the "main block" where the pages will be loaded.</p>
</details>

<details>
  <summary>Partial</summary>
  <p>Will ask for the file name to  be created. Say you answer 'footer', it will create the `src/partials/footer.njk` file, that you could then include where needed with {% include 'src/partials/footer.njk' %}.</p>
</details>

## Save to Git

From the project's root folder:

```
zou git:save
```

It will prompt for a `Commit message` or generate one as `Update from month/day at h:m`, ask for the branch name and defaulting to `master`.

It will basically do *(in one go)* the equivalent of:

```
git add .
git commit -m "commitMessage"
git push origin branch
```

The basic "take everything and throw it on master", that's why it's called by a generic *git:save* like a Ctr/Cmd+S. Other git:commands might come later.

## Manual Deploy to Vercel

From the project's root folder:

```
zou deploy:vercel
```

It will build the project, move into `/public` and call `vercel deploy --prod`. The first time it will setup the distant project or link to an existant, and the next ones will just upload the website.

If you have "strange characters" in the terminal, just do the first deploy directly by `cd public && vercel deploy --prod`. From here, the deploy:vercel from the root will roll. *Nothing is "borken" just Bash commands running from Node via zh wraper*.


## Manual Deploy to Netlify

Be sure to have Netlify CLI installed: `npm install netlify-cli -g`. 

```
zou deploy:netlify
```

It will build the project, move into `/public` and call `netlify deploy --prod` for a [Manual Deploy](https://docs.netlify.com/cli/get-started/#manual-deploys). 

One approach is to [drop here](https://app.netlify.com/drop) the `public/` folder after running `npm run build` the first time, and change the name on Netlify to match with your project. > Go inside the public/ folder, call `netlify link` and link them.

Next times from the root of your local project `npx zou deploy:netlify` will be enough, build & deploy simple command. To save your code ...*zou git:save*


---


Related Docs, *just in case*: [Nunjucks](https://mozilla.github.io/nunjucks/templating.html), [Openprops](https://open-props.style/#getting-started), [Hyperscript](https://hyperscript.org/docs/#basics), [SCSS](https://sass-lang.com/documentation/variables/), [zouMixins](https://github.com/AndiKod/zouMixins), [Tailwind](https://tailwindcss.com/docs/installation), [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html). 

Via [zouMacros](https://github.com/AndiKod/zouMacros): [AlpineJS](https://alpinejs.dev/start-here), [htmX](https://htmx.org/), [Pocketbase](https://pocketbase.io/docs/), [ChotaCSS](https://jenil.github.io/chota/#docs), [BonsaiCSS](https://www.bonsaicss.com/), [Bulma](https://bulma.io/documentation/), [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) Comming soon: [Supabase](https://supabase.com/docs/guides/database/overview), [Planetscale](https://planetscale.com/docs).


---

## Changelog

#### 1.1.0

Added the `deploy:vercel`, `deploy:netlify`, `git:save` commands and fixed the postbuild script.

#### 1.1.1

Fixed some misspelled filenames causing troubles with Tailwind & Typescript. It's fine now.

#### 1.2.0

- Added FrontMatter support to the pages in the templates
- Automatic 'database' object with the data from the frontmatter
- Collections, Tags, limitFromTo(), withTag('something'), ... Nunjucks filters
- Navigation objects generating navMain, navFooter,...
- and maybe other things I can't remenber

#### 1.2.2 

- Fixed the commit message from the `zou git:save` command. It displayed the default message instead of the custom one, it's now back to normal.

#### 1.3.0

- SCSS files are now organized in 7-1 SASS inspired folders, imported into main.scss using the @forward/@use pattern. Use it as a starting point, of have fun "freestyling into the getWild zone" ;)

#### 1.4.0

**:: Aditions**

- Oneliner options to instantly scaffold projects with flags:
- zou create myProject -y -vsc : SCSS + JS project and open it in VSCode
- zou create myProject -tw -vsc : Tailwind + JS project and open it in VSCode
- zou create myProject -full -vsc : SCSS/JS/Jest/JSDoc/sassDoc project and open it in VSCode
- Without the -vsc flag, everything is still instantly created, you can just `cd myProject`.
- Generally speaking, JS Testing & TypeChecking plus Docs generation are added as options.
  

**:: Deprecation**

- The 'Play with CDN' prompt is removed, as we can simply use {{cdn.pkg('whatever')}} from within a layout folder, and having a select form would be a nightmare to maintain. Just check [zouMacros](https://github.com/AndiKod/zouMacros) for the available packages list.


