'use strict';

exports.format = (val1, val2) => {
  const p = val1 + val2;
  return '/' + p.split('/').filter((v) => {
    return v
  }).join('/');
}

exports.formatPrefix = (prefix, opts) => {
  if (typeof opts === 'string') {
    return exports.format(prefix, opts);
  }
  else if (opts.path instanceof RegExp) {
    throw new Error('group routes not suported regexp');
  }
  else {
    return exports.format(prefix, opts.path ? opts.path.toString() : '');
  }
}

exports.verify = (opts, prefix) => {
  let newOpts = opts
  if (typeof newOpts === 'string') {
    newOpts = exports.formatPrefix(prefix, newOpts);
  }
  else if (newOpts instanceof RegExp) {
    throw new Error('group routes not suported regexp');
  }
  else {
    newOpts.path = exports.formatPrefix(prefix, newOpts);
  }
  return newOpts;
}