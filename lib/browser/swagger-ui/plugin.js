const {dispatch} = require('../utils');

function SwaggerPlugin () {
  return {
    statePlugins: {
      auth: {
        wrapActions: {
          showDefinitions: (originalAction) => (...args) => {
            const flag = args[0];
            originalAction(...args);

            if (flag === false) {
              // the popup is closing
              console.log('closing the popup');

            } else {
              // the popup is opening
              console.log('opening the popup');
            }
          }
        }
      }
    }
  };
}


module.exports = {SwaggerPlugin};
