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


dotest.add ('search', function (test) {
  var props = {
    query: 'who:"laurent de la hyre"'
  };

  europeana ('search', props, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('fail', 'data.items', data && data.items)
      .isNotEmpty ('warn', 'data.items', data && data.items)
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
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isObject ('fail', 'data.object', data && data.object)
      .isNotEmpty ('warn', 'data.object', data && data.object)
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
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('warn', 'data.translations', data && data.translations)
      .done ();
  });
});


dotest.add ('providers normal', function (test) {
  europeana ('providers', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('warn', 'data.items', data && data.items)
      .done ();
  });
});


dotest.add ('providers params', function (test) {
  var params = {
    pagesize: 3
  };

  europeana ('providers', params, function (err, data) {
    var items = data && data.items;

    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('fail', 'data.items', items)
      .isExactly ('warn', 'data.items.length', items && items.length, 3)
      .done ();
  });
});


dotest.add ('Error: API error', function (test) {
  europeana ('record/-', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isNumber ('fail', 'err.code', err && err.code)
      .isString ('fail', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: request failed', function (test) {
  var tmp = app (apikey, 1);

  tmp ('providers', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Error: apikey missing', function (test) {
  var tmp = app ();

  tmp ('providers', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'apikey missing')
      .isUndefined ('fail', 'data', data)
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
