'use strict';
const util = require('../lib/util');

describe('test util', () => {

  it('format simples', (done) => {
    const val = util.format('/', '/group')
    expect(val).toBe('/group')
    done()
  })

  it('format params', (done) => {
    const val = util.format('/test/:id', '/group')
    expect(val).toBe('/test/:id/group')
    done()
  })

  it('verify', (done) => {
    const val = util.verify('/test/:id', '/group')
    expect(val).toBe('/group/test/:id')
    done()
  })

  it('verify regex', (done) => {
    try {
      util.verify(new RegExp('[a-z]'), '/group')
    } catch (error) {
      expect(error.message).toBe('group routes not suported regexp')
    }
    done()
  })

  it('formatPrefix', (done) => {
    const val = util.formatPrefix('/group', '/test/:id')
    expect(val).toBe('/group/test/:id')
    done()
  })

  it('formatPrefix regex', (done) => {
    try {
      util.formatPrefix( '/group', {
        path: new RegExp('[a-z]')
      })
    } catch (error) {
      expect(error.message).toBe('group routes not suported regexp')
    }
    done()
  })

})