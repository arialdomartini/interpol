/**
 * Interpol (Templates Sans Facial Hair)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/kode4food)
 */

"use strict";

function createModuleCache() {
  var cache = {};

  return {
    exists: exists,
    getModule: getModule,
    getExports: getExports,
    putModule: putModule,
    removeModule: removeModule
  };

  function exists(name) {
    return cache[name];
  }

  function getModule(name) {
    var result = cache[name];
    return result ? result.module : null;
  }

  function getExports(name) {
    var result = cache[name];
    if ( !result ) {
      return null;
    }

    if ( !result.dirtyExports ) {
      return result.moduleExports;
    }

    var moduleExports = result.moduleExports
      , key = null;

    if ( !moduleExports ) {
      moduleExports = result.moduleExports = {};
    }
    else {
      // This logic is necessary because another module may already be
      // caching this result as a dependency.
      for ( key in moduleExports ) {
        if ( moduleExports.hasOwnProperty(key) ) {
          delete moduleExports[key];
        }
      }
    }

    var exported = result.module.exports();
    for ( key in exported ) {
      if ( exported.hasOwnProperty(key) ) {
        moduleExports[key] = exported[key];
      }
    }

    result.dirtyExports = false;
    return moduleExports;
  }

  function putModule(name, module) {
    var cached = cache[name];
    if ( cached ) {
      cached.module = module;
      cached.dirtyExports = true;
    }
    else {
      cached = cache[name] = { module: module, dirtyExports: true };
    }
    return cached.module;
  }

  function removeModule(name) {
    delete cache[name];
  }
}

// Exports
exports.createModuleCache = createModuleCache;