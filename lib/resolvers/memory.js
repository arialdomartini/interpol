/*
 * Interpol (Templates Sans Facial Hair)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/kode4food)
 */

"use strict";

var interpol = require('../interpol')
  , util = require('../util');

var slice = Array.prototype.slice
  , isArray = util.isArray
  , isInterpolJSON = util.isInterpolJSON
  , bless = util.bless
  , configure = util.configure;

/**
 * Creates a new Memory Resolver.  As its name implies, this resolver
 * allows one to register a module to be stored in memory.  A default 
 * instance of this resolver is used to store the System Modules.  
 * Because of its flexibility, it can also be used to store custom 
 * modules and native JavaScript helpers.
 */

function createMemoryResolver(options) {
  var cache = {};

  return {
    resolveModule: resolveModule,
    resolveExports: resolveExports,
    unregisterModule: unregisterModule,
    registerModule: registerModule
  };

  function resolveModule(name) {
    var result = cache[name];
    return result ? result.module : null;
  }

  function resolveExports(name) {
    var result = cache[name];
    if ( !result ) {
      return null;
    }

    if ( result.moduleExports ) {
      return result.moduleExports;
    }

    var moduleExports = result.moduleExports = result.module.exports();
    return moduleExports;
  }

  /**
   * Removes a module from the resolver cache.
   *
   * @param {String} name the name of the module to remove
   */

  function unregisterModule(name) {
    delete cache[normalizeModuleName(name)];
  }

  /**
   * Registers a module in the module cache.
   *
   * @param {String} name the name of the module to be registered
   * @param {Function|String|Object} module the module to register
   */

  function registerModule(name, module) {
    name = normalizeModuleName(name);

    // *Function* - A compiled Interpol closure
    if ( typeof module === 'function' &&
         typeof module.exports === 'function' ) {
      cache[name] = { module: module };
      return;
    }

    // *String* - An unparsed Interpol template **or** 
    // *Object* - A pre-parsed Interpol template
    if ( typeof module === 'string' || isInterpolJSON(module) ) {
      cache[name] = { module: interpol(module) };
      return;
    }

    // *Object* - A hash of Helpers (name->Function)
    if ( typeof module === 'object' && !isArray(module) ) {
      cache[name] = { moduleExports: blessModule(module) };
      return;
    }

    throw new Error("Module not provided");
  }
}

/**
 * Creates a 'blessed' module where are Functions are made to be both
 * Interpol-compatible and configurable.
 *
 * @param {Object} module the Module to bless
 */

function blessModule(module) {
  var result = {};
  for ( var key in module ) {
    var value = module[key];
    if ( typeof value === 'function') {
      result[key] = configurable(bless(value));
    }
    else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Attaches a Function called `configure` to the provided Function.  This
 * attached Function allows one to configure defaults for calls to the
 * owning Function.  The result is that any function imported into an
 * Interpol template can be configured for easy re-use and piping.
 *
 * @param {Function} func the Function to make configurable
 */

function configurable(func) {
  blessedConfigure.__interpolFunction = true;
  func.configure = blessedConfigure;
  return func;

  function blessedConfigure(writer) {
    // writer, value are always passed to configurables, hence the '2'
    var configured = configure(func, 2, slice.call(arguments, 1));
    configured.__interpolFunction = true;
    return configured;
  }
}

function normalizeModuleName(name) {
  return name.replace(/[/\\.]+/g, '/');
}

// Add Default Memory Resolver
var defaultMemoryResolver = createMemoryResolver();
interpol.resolvers().push(defaultMemoryResolver);
interpol.registerModule = defaultMemoryResolver.registerModule;
interpol.unregisterModule = defaultMemoryResolver.unregisterModule;

// Exported Functions
exports.defaultMemoryResolver = defaultMemoryResolver;
exports.createMemoryResolver = createMemoryResolver;
interpol.createMemoryResolver = createMemoryResolver;
