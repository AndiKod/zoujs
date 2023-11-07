import Alpine from 'alpinejs';

// Uppercase the element's inner text
// <h1 x-text="name" x-up></h1>
// Same as the njk filter <h1>{{"name"|upper}}</h1>
Alpine.directive('up', el => {
  el.textContent = el.textContent.toUpperCase()
})