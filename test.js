const dotest = require ('dotest');
const pkg = require ('./');

// Setup
// $ WSKEY=abc123 npm test
const wskey = process.env.EUROPEANA_WSKEY || null;
const timeout = process.env.EUROPEANA_TIMEOUT || 15000;

const app = new pkg ({
  wskey,
  timeout,
});


dotest.add ('Interface', test => {
  test()
    .isClass ('fail', 'exports', pkg)
    .isFunction ('fail', 'search', app && app.search)
    .isFunction ('fail', 'getRecord', app && app.getRecord)
    .isFunction ('fail', 'getRecordThumbnailUrl', app && app.getRecordThumbnailUrl)
    .isFunction ('fail', 'getEntity', app && app.getEntity)
    .isFunction ('fail', 'resolveEntity', app && app.resolveEntity)
    .isFunction ('fail', 'suggestEntities', app && app.suggestEntities)
    .done()
  ;
});


dotest.add ('search', async test => {
  try {
    const data = await app.search ({
      query: 'who:"laurent de la hyre"',
    });

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


dotest.add ('getRecord', async test => {
  try {
    const data = await app.getRecord ({
      id: '9200365/BibliographicResource_1000055039444',
    });

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


dotest.add ('getRecordThumbnailUrl', async test => {
  try {
    const data = await app.getRecordThumbnailUrl ({
      uri: 'https://www.dropbox.com/s/8gpbipwr4ipwj37/Austria_Gerstl.jpg?raw=1',
      type: 'IMAGE',
      size: 'w400',
    });

    test()
      .isString ('fail', 'data', data)
      .isExactly ('fail', 'data', data, 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.dropbox.com%2Fs%2F8gpbipwr4ipwj37%2FAustria_Gerstl.jpg%3Fraw%3D1&type=IMAGE&size=w400')
      .done()
    ;
  }

  catch (err) {
    test (err).done();
  }
});


dotest.add ('resolveEntity', async test => {
  try {
    const data = await app.resolveEntity({
      uri: 'https://dbpedia.org/page/Leonardo_da_Vinci',
    });

    test()
      .isString ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .done()
    ;
  }

  catch (err) {
    test (err).done();
  }
});


dotest.add ('API error - HTML', async test => {
  let error;
  let data;

  try {
    data = await app.getRecord ({
      id: '-',
    });
  }

  catch (err) {
    error = err;
  }

  finally {
    test()
      .isError ('fail', 'error', error)
      .isNotEmpty ('fail', 'error.message', error && error.message)
      .isExactly ('fail', 'error.code', error && error.code, 404)
      .isUndefined ('fail', 'data', data)
      .done()
    ;
  }
});


dotest.add ('API error - JSON', async test => {
  let error;
  let data;

  try {
    data = await app.getRecord ({
      id: '1111111/TEST',
    });
  }

  catch (err) {
    error = err;
  }

  finally {
    test()
      .isError ('fail', 'error', error)
      .isNotEmpty ('fail', 'error.message', error && error.message)
      .isExactly ('fail', 'error.code', error && error.code, 404)
      .isUndefined ('fail', 'data', data)
      .done()
    ;
  }
});


dotest.add ('Error: request timeout', async test => {
  let error;
  let data;

  try {
    const tmp = new pkg ({
      wskey,
      timeout: 1,
    });

    data = await tmp.getRecord ({
      id: '9200365/BibliographicResource_1000055039444',
    });
  }

  catch (err) {
    error = err;
  }

  finally {
    test()
      .isError ('fail', 'error', error)
      .isExactly ('fail', 'error.code', error && error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done()
    ;
  }
});


// Start the tests
dotest.run(500);
