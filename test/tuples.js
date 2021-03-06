var nodeunit = require('nodeunit')
  , interpol = require('../lib');

function eval(str, ctx) {
  var template = interpol(str);
  return template(ctx);
}

exports.tuples = nodeunit.testCase({
  "Expression Tuples": function (test) {
    test.equal(eval("(9,8,'Hello',7,3)[2]"), "Hello");
    test.equal(eval("(9,8,'Hello',7,3,).length"), 5);
    test.equal(eval("(3 * 3, 2 * 4, 'Hel'+'lo', 14 / 2, 9 / 3)[2]"), "Hello");
    test.equal(eval("(1000).length"), "");
    test.equal(eval("(1000,).length"), "1");
    test.done();
  },

  "Dictionary Tuples": function (test) {
    test.equal(eval("(name='Thom',age=42).age"), "42");
    test.equal(eval("(name='Thom',age=21*2,).age"), "42");
    test.equal(eval("(age=21*2).age"), "42");
    test.done();
  },

  "Nested Tuples": function (test) {
    var base = "(" +
               "  name   = 'World'," +
               "  title  = 'Famous People', " +
               "  people = (" +
               "    ( name = 'Larry', age = 50 )," +
               "    ( name = 'Curly', age = 45 )," +
               "    ( name = 'Moe', age = 58 )," +
               "  )" +
               ")";

    test.equal(eval(base + ".title"), "Famous People");
    test.equal(eval(base + ".people[1].name"), "Curly");
    test.equal(eval(base + ".people.length"), "3");
    test.done();
  }
});
