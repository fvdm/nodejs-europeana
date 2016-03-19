var doTest = require ('dotest');
var app = require ('./');

// Setup
// $ EUROPEANA_KEY=abc123 npm test
var europeana = app (
  process.env.EUROPEANA_APIKEY || null,
  process.env.EUROPEANA_TIMEOUT || 5000
);


doTest.add ('Module', function () {
  doTest.test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'module', europeana)
    .done ();
});


doTest.add ('search', function () {
  var props = {
    query: 'who:"laurent de la hyre"'
  };

  europeana ('search', props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


doTest.add ('record', function () {
  var record = '9200365/BibliographicResource_1000055039444';
  var props = {
    profile: 'params'
  };

  europeana ('record/' + record, props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


/*
// Suggestions in unavailable
// http://labs.europeana.eu/api/suggestions
doTest.add ('suggestions', function () {
  var props = {
    query: 'laurent de la hyre',
    rows: 10
  };

  app ('suggestions', props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});
*/


// Start the tests
doTest.run ();
