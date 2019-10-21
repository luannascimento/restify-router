'use strict';

const RouterGroup = require('./RouterGroup')
const RouterValidator = require('./RouterValidator')

/**
 * @public
 * @class RouterMiddleware
 */
class RouterMiddleware {

  constructor(server, options, ...middlewares) {
    this.options = options
    this.server = server;
    this.middlewares = middlewares ? middlewares : [];
    this.middlewareApi = (this.options && this.options.middlewares) ? this.options.middlewares : {};
  }

  group(prefix, cb) {
    cb(new RouterGroup(this.server, prefix, ...this.middlewares));
  }

  validator(validatorForm) {
    const handlersAndMidd = this.formatHandlers();
    let handlers;
    if (handlersAndMidd.length !== 0) {
      handlers = handlersAndMidd;
    }
    else {
      handlers = undefined;
    }
    return new RouterValidator(this.server, validatorForm, handlers);
  }

  get(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      this.server.get(opts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  post(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      this.server.post(opts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  put(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      this.server.put(opts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  del(opts, ...handlers) {
    try {
      const handlersAndMidd = this.formatHandlers(...handlers);
      this.server.del(opts, ...handlersAndMidd);
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  formatHandlers(...handlers) {
    let handlersAndMidd = handlers;
    if (this.middlewares.length > 0) {
      this.middlewares.reverse().forEach((midd) => {
        handlersAndMidd = [ this.middlewareApi[midd], ...handlersAndMidd ];
      });
    }
    return handlersAndMidd;
  }
}

module.exports = RouterMiddleware