const headingChange = require('./headingChange');

$(document).ready( () => {
  const $selector = $('#cu-global-nav .primary-link a');
  console.log('AM I GETTING HERE');
  console.log($selector);
  $selector.text('ES6!!!');
  headingChange();
})