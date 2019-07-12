const dotest = require ('dotest');
const app = require ('./');

// Setup
// $ EUROPEANA_KEY=abc123 npm test
const apikey = process.env.EUROPEANA_APIKEY || null;
const timeout = process.env.EUROPEANA_TIMEOUT || 5000;

const europeana = app (apikey, timeout);


dotest.add ('Module', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'module', europeana)
    .done()
  ;
});


dotest.add ('search', async test => {
  try {
    const props = {
      query: 'who:"laurent de la hyre"',
    };

    const data = await europeana ('search', props);

    test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('fail', 'data.items', data && data.items)
      .isNotEmpty ('warn', 'data.items', data && data.items)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


dotest.add ('record', async test => {
  try {
    const record = '9200365/BibliographicResource_1000055039444';
    const props = {
      profile: 'params',
    };

    const data = await europeana (`record/${record}`, props);

    test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isObject ('fail', 'data.object', data && data.object)
      .isNotEmpty ('warn', 'data.object', data && data.object)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


dotest.add ('translateQuery', async test => {
  try {
    const props = {
      languageCodes: 'nl,en,hu',
      term: 'painting',
    };

    const data = await europeana ('translateQuery', props);

    test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('warn', 'data.translations', data && data.translations)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


dotest.add ('providers normal', async test => {
  try {
    const data = await europeana ('providers');

    test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('warn', 'data.items', data && data.items)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


dotest.add ('providers params', async test => {
  try {
    const params = {
      pagesize: 3,
    };
  
    const data = await europeana ('providers', params);
    const items = data.items;
  
    test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.success', data && data.success, true)
      .isArray ('fail', 'data.items', items)
      .isExactly ('warn', 'data.items.length', items && items.length, 3)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


dotest.add ('Error: API error', async test => {
  try {
    const data = await europeana ('record/-');

    test()
      .isUndefined ('fail', 'data', data);
      .done()
    ;
  }
  catch (err) {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isNumber ('fail', 'err.code', err && err.code)
      .isString ('fail', 'err.error', err && err.error)
      .done()
    ;
  }
});


dotest.add ('Error: request failed', async test => {
  try {
    const tmp = app (apikey, 1);
    const data = await tmp ('providers');

    test()
      .isUndefined ('fail', 'data', data)
      .done()
    ;
  }
  catch (err) {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .done()
    ;
  }
});


dotest.add ('Error: apikey missing', async test => {
  try {
    const tmp = app();
    const data = await tmp ('providers');

    test()
      .isUndefined ('fail', 'data', data)
      .done()
    ;
  }
  catch (err) {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'apikey missing')
      .done()
    ;
  }
});


/*
// Suggestions is unavailable
// http://labs.europeana.eu/api/suggestions
dotest.add ('suggestions', test => {
  const props = {
    query: 'laurent de la hyre',
    rows: 10
  };

  app ('suggestions', props, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .done();
  });
});
*/

// Start the tests
dotest.run();
