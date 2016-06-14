var dotest = require ('dotest');
var app = require ('./');

// Setup
// $ EUROPEANA_KEY=abc123 npm test
var apikey = process.env.EUROPEANA_APIKEY || null;
var timeout = process.env.EUROPEANA_TIMEOUT || 5000;

var europeana = app (apikey, timeout);


dotest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'module', europeana)
    .done ();
});


dotest.add ('API key', function (test) {
  if (!apikey) {
    dotest.log ('fail', 'EUROPEANA_APIKEY is not set');
    dotest.exit ();
  } else {
    dotest.log ('good', 'EUROPEANA_APIKEY is set');
    test ()
      .done ();
  }
});


dotest.add ('search', function (test) {
  var props = {
    query: 'who:"laurent de la hyre"'
  };

  europeana ('search', props, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('record', function (test) {
  var record = '9200365/BibliographicResource_1000055039444';
  var props = {
    profile: 'params'
  };

  europeana ('record/' + record, props, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('translateQuery', function (test) {
  var props = {
    languageCodes: 'nl,en,hu',
    term: 'painting'
  };

  europeana ('translateQuery', props, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isArray ('warn', 'data.translations', data && data.translations)
      .done ();
  });
});


dotest.add ('providers normal', function (test) {
  europeana ('providers', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isArray ('warn', 'data.items', data && data.items)
      .done ();
  });
});


dotest.add ('providers params', function (test) {
  var params = {
    pagesize: 3
  };

  europeana ('providers', params, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isArray ('warn', 'data.items', data && data.items)
      .isExactly ('warn', 'data.items.length', data && data.items && data.items.length, 3)
      .done ();
  });
});


/*
// Suggestions in unavailable
// http://labs.europeana.eu/api/suggestions
dotest.add ('suggestions', function (test) {
  var props = {
    query: 'laurent de la hyre',
    rows: 10
  };

  app ('suggestions', props, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});
*/


// Start the tests
dotest.run ();
