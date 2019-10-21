'use strict';
const restify = require('restify');
const Router = require('../lib/Router')
const RouterValidator = require('../lib/RouterValidator');

describe('test router validator', () => {

  const server = restify.createServer();
  Router.init(server, {
    route: '../exemple/api',
    validators: {
      'validator': (req, res, next) => {}
    }
  });

  it('instance', (done) => {
    try {
      const routerValidator = new RouterValidator(server, 'validator', (req,res,next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('get', (done) => {
    try {
      const routerValidator = new RouterValidator(server, 'validator')
      routerValidator.get('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('post', (done) => {
    try {
      const routerValidator = new RouterValidator(server, 'validator')
      routerValidator.post('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('put', (done) => {
    try {
      const routerValidator = new RouterValidator(server, 'validator')
      routerValidator.put('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('del', (done) => {
    try {
      const routerValidator = new RouterValidator(server, 'validator')
      routerValidator.del('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('formatHandlers', (done) => {
    try {
      const routerValidator = new RouterValidator(server, {
        validators: {
          'validator': (req,res,next) => {}
        }
      }, 'validator', (req,res,next) => {})
      const data = routerValidator.formatHandlers((req,res,next) => {})
      expect(data.length).toBe(3);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

});