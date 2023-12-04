
// zou.config.js

// Get Lodash in
const _ = require('lodash');

/* Import Data file*/
const store = require("./src/data/store.js");        
const db = require('./src/data/db.js');       
const nav = require('./src/data/nav.js');
const tags = _.uniqBy( _.flatMap(db.pages, 'tags') );

/* Data to use from .njk files */
/* <h2>{{data.appName}}</h2> */
/* {% for link in data.links %} ... {% endfor %}*/

const data = {
  appName: 'sass-js',
  links: store.links,
  pages: db.pages,
  navMain: nav.navMain,
  tags: tags,
};


module.exports = {
  "options": {
    /**
     * A path to the file containing data for the template.
     * If you want to pass an object, use "render.context" instead.
     */
    //"data": "src/njk/data/data.js",
    /**
     * A hook that's called before calling nunjucks.render()
     * but after nunjucks.configure().
     *
     * Return false to skip rendering (and writing).
     */
    beforeRender (nunjucksEnv, renderName, renderData) {
      let nunjucks = this;

      nunjucksEnv.addFilter('shorten', function(str, count) {
          return str.trim().slice(0, count || 5);
      });

      // Get data of a particular Tag (from frontmatter)
      // {% for posts data.pages | withTag('racoon') %}
      nunjucksEnv.addFilter('withTag', function(input, tag){

        function byTag(input) {
          return input.tags.includes(tag);
        }

        return input.filter(byTag);
      });

      // Collections. Get pages with urls including a pattern
      // {% for posts data.pages | urlInc('/blog/') %}
      nunjucksEnv.addFilter('urlInc', function(input, url){

        function byUrl(input) {
          return input.url.includes(url);
        }

        return input.filter(byUrl);
      });

      // Frontmatter data of the curent page
      // {% for posts data.pages | urlIs('/blog/article-one') %}
      nunjucksEnv.addFilter('urlIs', function(input, url){

        function byUrl(input) {
          return input.url === url;
        }

        return input.filter(byUrl);
      });

      // Limt the amount of results from/to. 3 most recent posts:
      // {% for posts in data.pages | reverse | urlInc('/blog/') | limitFormTo(0, 3) %}
      // The selection function works on numbers and strings too.
      nunjucksEnv.addFilter('limitFromTo', function(input, from, limit) {
        'use strict';
        if(typeof limit !== 'number'){
          return input;
        }
        if(typeof input === 'string'){
          if(limit >= 0){
            return input.substring(from, limit);
          } else {
            return input.substr(limit);
          }
        }
        if(Array.isArray(input)){
          limit = Math.min(limit, input.length);
          if(limit >= 0){
            return input.splice(from, limit);
          } else {
            return input.splice(input.length + limit, input.length);
          }
        }
        return input;
      });

    },
    /**
     * A hook that's called after calling nunjucks.render()
     * but before writing to a file.
     *
     * Return false to skip writing.
     */
    beforeWrite (destinationFilepath, renderResult) { let nunjucks = this; }
  },

  /**
   * The following keys are members of Nunjucks.
   * To modify any parameter or see possible values,
   * please check https://mozilla.github.io/nunjucks/api.html
   */

  // Executes nunjucks.configure([path], [options]).
  "configure": {
    "path": undefined,
    "options": {
      "autoescape": true,
      "throwOnUndefined": false,
      // ...
    }
  },

  // Executes nunjucks.render(name, [context], [callback]).
  "render": {
    "name": undefined, // You shouldn't change this.
    /**
     * An object literal containing the data for the template.
     * If you need to load data from a file, use "options.data" instead.
     * If you decide to use "options.data" too, this property will be assigned to it.
     */
    "context": {data},
    "callback": () => {} // Not modificable.
  }

};