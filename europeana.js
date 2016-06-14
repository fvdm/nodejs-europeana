/*
Name:         europeana.js
Description:  Unofficial node.js module for the Europeana API
Author:       Franklin van de Meent - https://frankl.in
Source:       https://github.com/fvdm/nodejs-europeana
Feedback:     https://github.com/fvdm/nodejs-europeana/issues
License:      Public Domain / Unlicense (see UNLICENSE file)
              (https://github.com/fvdm/nodejs-europeana/raw/master/UNLICENSE)
*/

var http = require ('httpreq');

var settings = {
  apikey: null,
  timeout: 5000
};

// errors
// http://www.europeana.eu/portal/api-working-with-api.html#Error-Codes

var errors = {
  400: 'The request sent by the client was syntactically incorrect',
  401: 'Authentication credentials were missing or authentication failed.',
  404: 'The requested record was not found.',
  429: 'The request could be served because the application has reached its usage limit.',
  500: 'Internal Server Error. Something has gone wrong, please report to us.'
};


/**
 * Process response
 *
 * @callback callback
 * @param err {Error, null} - httpreq error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function httpResponse (err, res, callback) {
  var data = res && res.body;
  var error = null;

  // client failed
  if (err) {
    error = new Error ('request failed');
    error.error = err;
    callback (error);
    return;
  }

  // http error
  if (res.statusCode !== 200) {
    error = new Error ('API error');
    error.code = res.statusCode;
    error.error = errors [res.statusCode];

    if (data.match (/<h1>HTTP Status /)) {
      error.error = data.replace (/.*<b>description<\/b> <u>(.+)<\/u><\/p>.*/, '$1');
    }

    callback (error);
    return;
  }

  try {
    data = JSON.parse (data);

    if (data.apikey) {
      delete data.apikey;
    }

    // API error
    if (!data.success && data.error) {
      error = new Error ('API error');
      error.error = data.error;
      error.data = data;

      callback (error);
      return;
    }
  } catch (reason) {
    error = new Error ('invalid response');
    error.error = reason;
    error.data = data;

    callback (error);
    return;
  }

  // all good
  callback (null, data);
}


/**
 * Communicate with API
 *
 * @callback callback
 * @param path {string} - Method path between `/v2/` and `.json`
 * @param fields {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function httpRequest (path, fields, callback) {
  var options = {
    method: 'GET',
    url: 'https://www.europeana.eu/api/v2/' + path + '.json',
    parameters: fields,
    timeout: settings.timeout,
    headers: {
      'User-Agent': 'europeana.js'
    }
  };

  if (typeof fields === 'function') {
    callback = fields;
    options.parameters = {};
  }

  // Request

  // check API key
  if (!settings.apikey) {
    callback (new Error ('apikey missing'));
    return;
  }

  options.parameters.wskey = settings.apikey;

  function doResponse (err, res) {
    httpResponse (err, res, callback);
  }

  http.doRequest (options, doResponse);
}


/**
 * Module interface
 *
 * @param [apikey] {string} - Your Europeana API key
 * @param [timeout = 5000] {number} - Request wait timeout in ms
 * @returns httpRequest {function}
 */

function setup (apikey, timeout) {
  settings.apikey = apikey || null;
  settings.timeout = timeout || settings.timeout;
  return httpRequest;
};

module.exports = setup;
