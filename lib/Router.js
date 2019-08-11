'use strict';

/**
 * @public
 * @class Router
 */
class Router {

}

Router.init = (server, options = {}) => {

  if (!server) {
    throw new Error('server invalid');
  }

  if (!Router.server) {
    Router.server = server;
  }

  if (!options.path) {
    options.path = 'routes/api.js';
  }

  try {
    // eslint-disable-next-line global-require
    require(options.path);
  } catch (error) {
    throw new Error(`file ${options.path} not found`);
  }
}

Router.get = (opts, ...handlers) => {
  try {
    Router.server.get(opts, ...handlers);
  } catch (error) {
    throw new Error(error.message);
  }
};

Router.post = (opts, ...handlers) => {
  try {
    Router.server.post(opts, ...handlers);
  } catch (error) {
    throw new Error(error.message);
  }
};

Router.put = (opts, ...handlers) => {
  try {
    Router.server.put(opts, ...handlers);
  } catch (error) {
    throw new Error(error.message);
  }
};

Router.del = (opts, ...handlers) => {
  try {
    Router.server.del(opts, ...handlers);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = Router