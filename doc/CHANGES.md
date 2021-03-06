# Change History

## Version 0.3.5 - Extended Tuples
Tuples now allow name/value pairs as well as the ability to force a single-element tuple (rather than treating the parentheses as a precedence operator).  Name/Value Tuples are always exposed as a Dictionary.  The name must be a valid identifier, while the value is any valid expression.

```python
(
  theMachine = 'Deep Thought',
  theAnswer = (28 - 7) * 2
)
# Treated like a dictionary { theMachine: 'Deep Thought', theAnswer: 42 }
```

Forcing a single-element tuple is performed as it would be in Python, by ending the tuple with a comma `,`.  See [the Language Reference](Language_Reference.md) for more information.

## Version 0.3.4 - Consolidated Resolvers
The Helper and System Resolvers have been merged into the Memory Resolver since it's all in memory anyway.  The default Memory Resolver's register/unregister functions are now exposed from the `interpol()` function , so registering a module of JavaScript helpers is easy:

```javascript
interpol.registerModule('myModule', {
  'hello': function (writer, name) {
    writer.content("Hello ," + name + "!");
  },
  'goodbye': function (writer, name) {
    writer.content("Goodbye ," + name + "!");
  }
});
```

See [the API Reference](API_Reference.md) for more information.

## Version 0.3.3 - Configurable Imports
Modules exposed by the system resolver now allow their functions to be configured.  This enables the developer to generate pre-configured pipeline functions.  For example:

```python
from array import join
let j = join.configure(" -- ")
let a = ('joined','with','dashes')
"Result is %a|j"
```

This would output:

```
Result is joined -- with -- dashes
```

The convention used here is that we always treat the first argument to a function as the piped input, and any subsequent arguments are configurable.  Of course, you could have also called `j` normally with `"Result is " + j(a)`

## Version 0.3.2 - Even Better Piped Interpolation
* Fixed a bug in piped interpolation where literals were used as a right-hand operands.
* Express View Engine now stops monitoring/compiling if NODE_ENV != 'development'.

## Version 0.3.1 - Better Piped Interpolation
Piped interpolation can now retrieve functions from the local scope if they're not present in the evaluated data.

## Version 0.3 - Piped Calls, DOM Writer

### Piped Calls
Basic Piped Calls are now supported.  This is useful to create filtering and formatting chains against helper functions.  For example:

```python
from array import join
from string import title
('single', 'title', 'cased', 'string') | join | title
```

The pipe operator has a relatively high precedence.  It is higher than unary, but lower than normal partial calls.

### Piped Interpolation
A limited form of the operator is also supported in string interpolation.

```python
from string import title
"My name is %name|title"
```

The restrictions in using this method are that the pipe character *can not* be surrounded by spaces and the right-hand operands can only be identifiers.

### DOM Writer
A very basic DOM Writer is now available for the browser.  You can create an instance by calling `createDOMWriter` with a parent Element and an optional rendering mode.

```javascript
var parentElem = document.getElementById('content')
  , domWriter = $interpol.createDOMWriter(parentElem, 'insert');
```

Now, every time you invoke your template with this writer, the parentElem's contents will be updated:

```javascript
myTemplate(data, { writer: domWriter });
```

There are three modes: Append, Insert, and Replace (the default).  `append` places any rendering after parentElem's current children, and `insert` at the beginning.  `replace` replaces all of the parentElem's content.

## Version 0.2.1 - Stringify Fix
Small bug fix.  `stringify()` should be called on values being interpolated.

## Version 0.2 - First Stable Release
This is the first stable (even numbered) release of Interpol.  There isn't any new and noteworthy functionality to be seen.  Instead, the release has focused on additional test coverage and documentation.

## Version 0.1.7 - Partial Hoisting
Partials are now conditionally hoisted to the top of their scope.  The condition for hoisting is that the name can't have already been encountered as a `let` assignment or partial definition in the current scope.  So if you define a partial that doesn't meet this condition, that definition will occur in-place.

For example, this is a valid hoist:

```python
# content will already be available for calling
content()

def content
  "hello"
end
```

While this is not a valid hoist:

```python
let content = "hello"

# error that you're calling a non-partial
content()

def content
  "not gonna happen"
end

# but you *can* call it here
content()
```

## Version 0.1.6 - Modularization
Have introduced Browserify to manage the build process for browser-targeted versions of Interpol.  This has allowed for some modularization refactorings, making the code much easier to maintain.  Any Browserify-specific code is in the `browserify` directory.

Also added a very simple Express example in the `examples` directory.

## Version 0.1.5 - Import Revisited
To reduce ambiguity and context pollution, the `import <module>` statement now imports a module as a single variable rather than automatically importing all of its exported properties.  This will require drilling into its membership.  You can also alias the imported module using `as`.  For example:

```python
import myModule as myAlias
myAlias.myPartial(someContext)
```

## Version 0.1.4 - Express Views
Added a view engine for [Express](http://expressjs.com/).  To set a development instance as the default engine, you can do the following:

```javascript
app.engine('int', require('interpol').__express);
app.set('view engine', 'int');
```

You can also instantiate customized engines.  Customizations include setting the search path for import resolution (uses './views' by default) and turning off file-system monitoring ('true' by default).

## Version 0.1.3 - Let, Unless, Imports and Stuff
Getting close to a usable system

* `let` allows you to define variables in the local scope, meaning it will shadow any variables in a parent scope, rather than allowing you to overwrite them.

* `unless` is syntactic sugar for `if !(...)`

* Importing now works against the three available resolvers: file (Node.js only), helpers, and memory.  See [the API Reference](API_Reference.md) for more information.

* Compiled templates now have an `exports()` function that returns functions and variables defined in their root context.  The results are evaluated against the global context *only*.

* The Command-Line interface can now generate a self-contained bundle of pre-parsed templates that can easily be loaded into a web page or Node.js environment.

* `self` refers to the variables of the current scope, and can be passed around.

* Named Interpolation is now supported.  Any `%` followed by an identifier is expanded to the value of that property in the passed Object. `self` is assumed if nothing is passed.  See [the Language Reference](Language_Reference.md) for more information.

## Version 0.1.2 - Bug Fixes and Test
Fixed some bugs in the PEG.js parser, including its inability to right-recurse unary and membership productions.  Also increased test coverage.

## Version 0.1.1 - Initial Optimizations
Starting to branch around literals as much as possible so that the runtime processor only executes code paths that are absolutely necessary.

## Version 0.1 - Initial Release
This is the initial release of Interpol.  There's still quite a lot to do and probably more than a few bugs, but it's at a stage now where it's somewhat usable.
