'use strict';

module.exports = {
  url: function () {
    return this.api.launchUrl + '/usage-and-configuration/swagger/swagger-ui.html';
  },
  elements: {
    root: {
      selector: '.dc-page',
    }
  },
  sections: {
    swaggerui:{
      selector: '.swagger-ui',
      elements: {
        apiname: {
          selector: '.api-name'
        },
        endpoints: {
          selector: '.endpoints'
        },
        operation: {
          selector: '.operation'
        }
      }
    }
  }
};
