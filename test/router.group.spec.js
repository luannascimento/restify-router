'use strict';
const restify = require('restify');
const Router = require('../lib/Router')
const RouterGroup = require('../lib/RouterGroup');

describe('test router group', () => {

  const server = restify.createServer();
  Router.init(server, {
    route: '../exemple/api',
    middlewares: {
      'midd': (req, res, next) => {}
    } 
  });

  it('instance', (done) => {
    try {
      const routerGroup = new RouterGroup(server,'/group')
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('get', (done) => {
    try {
      const routerGroup = new RouterGroup(server, '/group')
      routerGroup.get('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('post', (done) => {
    try {
      const routerGroup = new RouterGroup(server)
      routerGroup.post('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('put', (done) => {
    try {
      const routerGroup = new RouterGroup(server)
      routerGroup.put('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('del', (done) => {
    try {
      const routerGroup = new RouterGroup(server)
      routerGroup.del('/', (req, res, next) => {})
      expect(true);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

  it('formatHandlers', (done) => {
    try {
      const routerGroup = new RouterGroup(server,'/test', null, 'midd')
      const data = routerGroup.formatHandlers((req,res,next) => {})
      expect(data.length).toBe(2);
    } catch (error) {
      done.fail(error);
    }
    done();
  });

});