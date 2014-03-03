/**
 * Interpol (Templates Sans Facial Hair)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/kode4food)
 */

var interpol = module.exports = require('./interpol');

// Pull in default Resolvers
require('./resolvers');

// Pull in Express View Engine
interpol.__express = require('./express').createExpressEngine();