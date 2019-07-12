/*
Name:         europeana.js
Description:  Unofficial node.js module for the Europeana API
Author:       Franklin van de Meent - https://frankl.in
Source:       https://github.com/fvdm/nodejs-europeana
Feedback:     https://github.com/fvdm/nodejs-europeana/issues
License:      Public Domain / Unlicense (see UNLICENSE file)
              (https://github.com/fvdm/nodejs-europeana/raw/master/UNLICENSE)
*/

const { doRequest } = require ('httpreq');

const settings = {
  apikey: null,
  timeout: 5000,
};

// errors
// http://www.europeana.eu/portal/api-working-with-api.html#Error-Codes

const errors = {
  400: 'The request sent by the client was syntactically incorrect',
  401: 'Authentication credentials were missing or authentication failed.',
  404: 'The requested record was not found.',
  429: 'The request could be served because the application has reached its usage limit.',
  500: 'Internal Server Error. Something has gone wrong, please report to us.',
};


/**
 * Make and call back error
 *
 * @callback callback
 * @param message {string} - Error.message
 * @param err {mixed} - Error.error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err) {}`
 * @returns {void}
 */

function doError (message, err, res) {
  const error = new Error (message);
  const code = res && res.statusCode;
  const body = res && res.body;

  error.code = code;
  error.error = err || errors[code] || null;
  error.data = body;

  return error;
}


/**
 * Process response
 *
 * @callback callback
 * @param err {Error, null} - httpreq error
 * @param res {object} - httpreq response details
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

async function doResponse (err, res) {
  let data = res && res.body;
  let html;

  // client failed
  if (err) {
    throw err;
  }

  // parse response
  try {
    data = JSON.parse (data);
  } catch (reason) {
    // weird API error
    if (data.match (/<h1>HTTP Status /)) {
      html = data.replace (/.*<b>description<\/b> <u>(.+)<\/u><\/p>.*/, '$1');
      throw doError ('API error', html, res);
    }

    throw doError ('invalid response', reason, res);
  }

  if (data.apikey) {
    delete data.apikey;
  }

  // API error
  if (!data.success && data.error) {
    throw doError ('API error', data.error, res);
  }

  if (res.statusCode >= 300) {
    throw doError ('API error', null, res);
  }

  // all good
  return data;
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

async function get ({
  path,
  parameters = null,
  apikey = settings.apikey,
  timeout = settings.timeout,
}) {
  const options = {
    url: `https://www.europeana.eu/api/v2/${path}.json`,
    method: 'GET',
    parameters,
    timeout,
    headers: {
      'User-Agent': 'europeana.js',
      'wsKey': apikey,
    },
  };

  if (!apikey) {
    throw new Error ('apikey missing');
  }

  return new Promise ((resolve, reject) => {
    doRequest (options, (err, data) => {
      if (err) {
        reject (err);
        return;
      }

      resolve (doResponse (data));
    });
  });
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
  return get;
}

module.exports = setup;
