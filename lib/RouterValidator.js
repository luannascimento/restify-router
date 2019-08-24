'use strict';

const Router = require('./Router')

/**
 * @public
 * @class RouterGroup
 */
class RouterValidator {
  constructor(server, validatorForm, ...middlewares) {
    this.options = Router.options;
    this.server = server;
    this.validatorForm = validatorForm;
    this.middlewares = middlewares ? middlewares : [];
    this.requestValidator = this.options.validators ? this.options.validators : [];
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
    if (this.validatorForm && this.requestValidator[this.validatorForm]) {
      handlersAndMidd = [ this.requestValidator[this.validatorForm], ...handlersAndMidd ];
    }

    if (this.middlewares.length > 0) {
      handlersAndMidd = this.middlewares.concat(handlersAndMidd);
    }
    return handlersAndMidd;
  }
}

module.exports = RouterValidator