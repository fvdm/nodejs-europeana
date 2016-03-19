var doTest = require ('dotest');

// Setup
// $ EUROPEANA_KEY=abc123 npm test
var app = require ('./') (
  process.env.EUROPEANA_APIKEY || null,
  process.env.EUROPEANA_TIMEOUT || 5000
);


doTest.add ('search', function () {
  var props = {
    query: 'who:"laurent de la hyre"'
  };

  app ('search', props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


doTest.add ('record', function () {
  var record = '9200365/BibliographicResource_1000055039444';
  var props = {
    profile: 'params'
  };

  app ('record/' + record props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data)
      .done ();
  });
});


doTest.add ('suggestions', function () {
  var props = {
    query: 'laurent de la hyre',
    rows: 10
  };

  app ('suggestions', props, function (err, data) {
    doTest.test (err)
      .isObject ('fail', 'data', data);
      .done ();
  });
});


// Start the tests
doTest.run ();
