'use strict';

/**
 *
 * tests: Key value pair of test name and function.
 *
 */

class Nightwatch {
  constructor (tests, ctx){
    this.tests = tests;
    this.ctx = ctx;
  }

  exports (){
    if ('function' === typeof this.tests){
      return this.tests(this.ctx);
    } else {
      return this.tests;
    }
  }
}
module.exports = Nightwatch;
