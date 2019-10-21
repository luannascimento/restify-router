'use strict';
const restify = require('restify');
const Router = require('../lib/Router')
const RouterMiddleware = require('../lib/RouterMiddleware');

describe('test router middleware', () => {
  const server = restify.createServer();
  Router.init(server, {
    route: '../exemple/api',
    middlewares: {
      'midd': (req, res, next) => {}
    } 
  });

  it('instance', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server,{
        middlewares: []
      })
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('get', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server, 'midd')
      routerMiddleware.get('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('post', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server)
      routerMiddleware.post('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('put', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server)
      routerMiddleware.put('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('del', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server)
      routerMiddleware.del('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('formatHandlers', (done) => {
    try {
      const routerMiddleware = new RouterMiddleware(server, null, 'midd')
      const data = routerMiddleware.formatHandlers((req,res,next) => {})
      expect(data.length).toBe(2);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

});