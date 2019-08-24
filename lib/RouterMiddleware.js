'use strict';

const Router = require('./Router')

/**
 * @public
 * @class RouterMiddleware
 */
class RouterMiddleware {

  constructor(server, ...middlewares) {
    this.options = Router.options
    this.server = server;
    this.middlewares = middlewares ? middlewares : [];
    this.middlewareApi = this.options.middlewares ? this.options.middlewares : {};
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