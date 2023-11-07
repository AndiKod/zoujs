import Alpine from 'alpinejs';

// Alpine Data Store, included into all pages via <body x-data="data">
document.addEventListener('alpine:init', () => {
  Alpine.data('data', ()  => ({

      name: 'Zou!',

      // Fired on x-init
      async init() {

      },
         
  })) // End Alpine.data('data')
}) // End EventListener