/**
 * Must have this for Jquery Starting
 * ES6 JavaScript with jQuery
 */
window.$ = window.jQuery = require("jquery");
(function ($) {
  $(document).on("click",function () {
    alert("jQuery is Working");
  });
})(jQuery);

/**
 * ES6 JavaScript without jquery
 */
class App {
  constructor() {
    console.log("Application is working");
  }
}
new App();