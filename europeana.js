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
 * @param   {string}  message  Error.message
 * @param   {mixed}   err      Error.error
 * @param   {object}  res      httpreq response details
 *
 * @returns {promise}
 */

function doError (message, err, res) {
  let error = new Error (message);
  let code;
  let body;

  if (res) {
    code = res.statusCode;
    body = res.body;
  }

  error.code = code;
  error.error = err || errors[code] || null;
  error.data = body;

  return error;
}


/**
 * Process response
 *
 * @param   {Error|null}  err  httpreq error
 * @param   {object}      res  httpreq response details
 *
 * @returns {promise}
 */

async function doResponse (err, res) {
  let data;
  let error;

  // client failed
  if (err) {
    throw err;
  }

  // parse response
  try {
    data = JSON.parse (res.body);
  }
  catch (reason) {
    // weird API error
    if (res.body.match (/<h1>HTTP Status /)) {
      error = res.body.replace (/.*<b>description<\/b> <u>(.+)<\/u><\/p>.*/, '$1');
      throw doError ('API error', error, res);
    }

    // another weird API error
    if (res.body.match (/<p><b>Type<\/b> Status Report<\/p>/)) {
      let errMsg;

      res.body.replace (/.*<h1>([^<]+)<\/h1><hr class="line" \/><p><b>Type<\/b> Status Report<\/p><p><b>Message<\/b> ([^<]+)<\/p><p><b>Description<\/b> ([^<]+)<\/p>/, (str, title, message, description) => {
        title = title.trim();
        message = message.trim().replace ('&#47;', '/');
        error = description.trim();
        errMsg = `${title}: ${message}`;
      });

      throw doError (errMsg, error);
    }

    // invalid API response
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
 * @param   {string}  path    Method path between `/v2/` and `.json`
 * @param   {object}  fields  Method parameters
 *
 * @returns {promise}
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
 * @param   {string}    [apikey]        Your Europeana API key
 * @param   {number}    [timeout=5000]  Request wait timeout in ms
 *
 * @returns {function}
 */

async function setup ({
  apikey = null,
  timeout = settings.timeout,
) {
  settings.apikey = apikey;
  settings.timeout = timeout;
  return get;
}

module.exports = setup;
