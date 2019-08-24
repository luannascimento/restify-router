'use strict';

const Router = require('./Router')
const util = require('./util')
/**
 * @public
 * @class RouterGroup
 */
class RouterGroup {
  constructor(server, prefix, ...middleware) {
    this.options = Router.options
    this.middlewares = [];
    this.server = server;
    this.prefix = prefix;
    this.validatorForm = '';
    this.middlewareApi = this.options.middlewares ? this.options.middlewares : {};
    this.validatorApi = this.options.validators ? this.options.validators : {};
    this.globalMiddlewares = middleware ? middleware : [];
  }

  get(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      const newOpts = util.verify(opts, this.prefix);
      this.server.get(newOpts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
    finally {
      this.validatorForm = '';
      this.middlewares = [];
    }
  }

  post(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      const newOpts = util.verify(opts, this.prefix);
      this.server.post(newOpts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
    finally {
      this.validatorForm = '';
      this.middlewares = [];
    }
  }

  put(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      const newOpts = util.verify(opts, this.prefix);
      this.server.put(newOpts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
    finally {
      this.validatorForm = '';
      this.middlewares = [];
    }
  }

  del(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      const newOpts = util.verify(opts, this.prefix);
      this.server.del(newOpts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
    finally {
      this.validatorForm = '';
      this.middlewares = [];
    }
  }

  formatHandlers(...handlers) {
    let handlersAndMidd = handlers;
    if (this.validatorForm !== '' && this.validatorApi[this.validatorForm]) {
      handlersAndMidd = [ this.validatorApi[this.validatorForm], ...handlersAndMidd ];
    }
    this.globalMiddlewares
      .concat(this.middlewares)
      .reverse()
      .forEach((midd) => {
        handlersAndMidd = [ this.middlewareApi[midd], ...handlersAndMidd ];
      })
    return handlersAndMidd;
  }
}

module.exports = RouterGroup