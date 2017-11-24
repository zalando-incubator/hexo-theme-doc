'use strict';

/**
 *
 * tests: Key value pair of test name and function.
 *
 */

const Hooks = ['before', 'after', 'beforeEach', 'afterEach'];

class Nightwatch {
  constructor(tests, ctx){
    this.tests = tests;
    this.ctx = ctx;
  }

  exports(){
    return Object
    .keys(this.tests)
    .reduce((acc, curr) => {
      acc[curr] = (browser, done) =>{
        const globals = browser.globals;

        if(!globals || !globals.tests){
          return;
        }

        const testExists = globals.tests[curr];
        const isHook = Hooks.includes(curr);

        if(!isHook && !testExists){
          return;
        }

        /**
         * Inject getDefaultPage function to page object.
         * */
        if(!!testExists){
          let getDefault;

          if(testExists.page){
            if('function' === typeof browser.page[testExists.page]){
              getDefault = () => browser.page[testExists.page]();
            }else{
              getDefault = () => {
                throw new ReferenceError(`Page with name "${testExists.page}" doesn't exist.`);
              }
            }
          }else{
            getDefault = () => {
              throw new ReferenceError('No default page for the test.');
            }
          }

          browser.page.getDefault = getDefault;
        }

        this.tests[curr](browser, done, this.ctx);
      };

      return acc;

    }, {});
  }
}
module.exports = Nightwatch;
