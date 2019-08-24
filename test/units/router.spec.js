'use strict';
const restify = require('restify');
const Router = require('../../lib/Router');

describe('test router', () => {

  it('init routes, not found file routes', (done) => {
    const server = restify.createServer();
    try {
      Router.init(server, {
        route: '/test/path/api.js'
      });
      done.fail('expected exception');
    } catch (error) {
      expect(error.message).toBe('file /test/path/api.js not found');
      done();
    }
  });

  it('init routes, undefined server', (done) => {
    try {
      Router.init();
      done.fail('expected exception');
    } catch (error) {
      expect(error.message).toBe('server invalid');
      done();
    }
  });

  it('init routes, valid server and file routes', (done) => {
    const server = restify.createServer();
    try {
      Router.init(server, {
        route: '../exemple/api'
      });
    } catch (error) {
      done.fail(error);
    }
    expect(true);
    done();
  });

  it('get', (done) => {
    try {
      Router.get('/', (req, res, next) => {
        res.send()
        next()
      })
    } catch (error) {
      done.fail(error);
    }
    expect(true);
    done();
  });

  it('post', (done) => {
    try {
      Router.post('/', (req, res, next) => {
        res.send()
        next()
      })
    } catch (error) {
      done.fail(error);
    }
    expect(true);
    done();
  });

  it('put', (done) => {
    try {
      Router.put('/:id', (req, res, next) => {
        res.send()
        next()
      })
    } catch (error) {
      done.fail(error);
    }
    expect(true);
    done();
  });

  it('del', (done) => {
    try {
      Router.del('/:id', (req, res, next) => {
        res.send()
        next()
      })
    } catch (error) {
      done.fail(error);
    }
    expect(true);
    done();
  });


});