'use strict';

const filterResponses = (responses) => {

  const filteredResponses = {};

  for (const responseCode in responses){
    const response = responses[responseCode];
    /*
     * Only filter responses with 2XX.
     */
    if (responseCode[0] === '2'){
      filteredResponses[responseCode] = response;
    }
  }

  return filteredResponses;

};

module.exports = {
  filterResponses
};

// FIXME:
// Enhancement: Discuss this approach to make it robust.
