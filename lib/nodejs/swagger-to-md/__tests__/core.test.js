'use strict';

const path = require('path');

// NOTE: consolidate autoload "installed template engines",
// but it doesn't work while running test suites with jest,
// so we should load them manually
const consolidate = require('consolidate');
consolidate.requires.ejs = require('ejs');

describe('swagger-to-md.core', () => {
  describe('createTransformer', () => {
    const {createTransformer} = require('../core');
    const testTranformer = createTransformer({
      input: (obj) =>  Promise.resolve(obj),
      modules: {
        body: {
          order: 1,
          template: path.resolve(__dirname, './templates/body.ejs'),
          controller: (ctx) => {
            return { text: ctx.body_text };
          }
        },
        head: {
          order: 0,
          template: path.resolve(__dirname, './templates/head.ejs')
        }
      }
    });

    it('should be a function', () => {
      expect(typeof testTranformer).toEqual('function');
    });

    it('should transform the input in the expected output in the right order', (done) => {
      const data = [];
      testTranformer({
        title: 'title',
        body_text: 'body'
      }).on('data', (chunk) => {
        data.push(chunk.toString());
      }).on('error', (err) => {
        expect(err).toBeUndefined();
      }).on('end', () => {
        expect(data[0].trim()).toEqual('title');
        expect(data[1].trim()).toEqual('body');
        done();
      });
    });

    it('should emit error and close the stream when input function rejects', (done) => {
      const testError = new Error('test error');
      const failingTransformer = createTransformer({
        input: () =>  Promise.reject(testError),
        modules: {}
      });
      failingTransformer().on('error', (err) => {
        expect(err).toBe(testError);
        done();
      });
    });

    it('should emit error and close the stream when controller function throw an error', (done) => {
      const testError = new Error('test error');
      const failingTransformer = createTransformer({
        input: () =>  Promise.resolve(),
        modules: {
          foo: {
            controller: () => { throw testError; }
          }
        }
      });
      failingTransformer().on('error', (err) => {
        expect(err).toBe(testError);
        done();
      });
    });
  });
});
