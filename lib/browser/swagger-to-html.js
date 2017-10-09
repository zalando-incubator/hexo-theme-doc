const Clipboard = require('clipboard');

new Clipboard('.doc-swagger-to-html .sample-snippet__copy-btn', {
  text: function (triggerElem) {
    const preBlock = triggerElem.parentNode.querySelector('pre') ;
    const textToCopy = preBlock.textContent;
    return textToCopy;
  }
});
