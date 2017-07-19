'use strict';

const path = require('path');

// NOTE: consolidate autoload "installed template engines",
// but it doesn't work while running test suites with jest,
// so we should load them manually
const consolidate = require('consolidate');
consolidate.requires.ejs = require('ejs');

const {createTransformer} = require('../core');

describe('swagger-to-md.core', () => {

  describe('createTransformer', () => {
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
      }).on('error', done.fail)
        .on('end', () => {
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

  describe('include_module', () => {
    const includeModuleTestTransformer = createTransformer({
      input: obj => Promise.resolve(obj),
      modules: {
        head: {
          template: path.resolve(__dirname, './templates/head-include-module.ejs')
        },
        subtitle: {
          include: true,
          template: path.resolve(__dirname, './templates/includes/subtitle.ejs')
        },
        description: {
          include: true,
          template: path.resolve(__dirname, './templates/includes/description.ejs')
        }
      }
    });

    it('should transform the input using include_module template helper', (done) => {
      const data = [];
      includeModuleTestTransformer({
        title: 'title',
        subtitle: 'subtitle'
      }).on('data', (chunk) => {
        data.push(chunk.toString());
      }).on('error', done.fail).on('end', () => {
        expect(data[0].trim()).toEqual('title\n\nsubtitle\n\ndescription');
        done();
      });
    });

    it('should return an empty string for a non-existent module', (done) => {
      const data = [];
      const transformer = createTransformer({
        input: obj => Promise.resolve(obj),
        modules: {
          head: {
            template: path.resolve(__dirname, './templates/head-include-module-doesnt-exist.ejs')
          }
        }
      });

      transformer({
        title: 'title',
      }).on('data', (chunk) => {
        data.push(chunk.toString());
      }).on('error', done.fail).on('end', () => {
        expect(data[0].trim()).toEqual('title');
        done();
      });
    });

  });
});
