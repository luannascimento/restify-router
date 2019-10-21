'use strict';

const util = require('./util')
/**
 * @public
 * @class RouterGroup
 */
class RouterGroup {
  constructor(server, options, prefix, ...middleware) {
    this.options = options
    this.middlewares = [];
    this.server = server;
    this.prefix = prefix;
    this.validatorForm = '';
    this.middlewareApi = (this.options && this.options.middlewares) ? this.options.middlewares : {};
    this.validatorApi = (this.options && this.options.validators) ? this.options.validators : {};
    this.globalMiddlewares = middleware ? middleware : [];
  }

  middleware(...middleware) {
    this.middlewares = middleware;
    return this;
  }

  validator(validatorForm) {
    this.validatorForm = validatorForm;
    return this;
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