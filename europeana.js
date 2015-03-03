/*
Name:         europeana.js
Description:  Unofficial node.js module for the Europeana API
Author:       Franklin van de Meent - https://frankl.in
Source:       https://github.com/fvdm/nodejs-europeana
Feedback:     https://github.com/fvdm/nodejs-europeana/issues
License:      Public Domain / Unlicense (see UNLICENSE file)
              (https://github.com/fvdm/nodejs-europeana/raw/master/UNLICENSE)
*/

var http = require ('http');
var querystring = require ('querystring');

var settings = {
  apikey: null,
  timeout: 5000
};

// config
module.exports = function setup (apikey, timeout) {
  settings.apikey = apikey || null;
  settings.timeout = timeout || settings.timeout;
  return talk;
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


// communicate with the API
function talk (path, fields, callback) {
  if (typeof fields === 'function') {
    callback = fields;
    fields = {};
  }

  // prevent multiple callbacks
  var complete = false;
  function doCallback (err, res) {
    if (!complete) {
      complete = true;
      callback (err, res);
    }
  }


  // Request

  // check API key
  if (!settings.apikey) {
    doCallback (new Error ('apikey missing'));
    return;
  }

  // build request
  fields.wskey = settings.apikey;
  var query = '?'+ querystring.stringify (fields);

  var options = {
    protocol: 'http:',
    host: 'europeana.eu',
    path: '/api/v2/'+ path +'.json'+ query,
    method: 'GET',
    headers: {
      'User-Agent': 'europeana.js'
    }
  };

  var request = http.request (options);


  // Handlers
  request.on ('socket', function onSocket (socket) {
    socket.setTimeout (parseInt (settings.timeout));
    socket.on ('timeout', function () {
      doCallback (new Error ('request timeout'));
      request.abort ();
    });
  });

  request.on ('error', function onError (error) {
    var err = new Error ('request failed');
    err.error = error;
    doCallback (err);
  });

  request.on ('response', function onResponse (response) {
    var data = [];
    var size = 0;

    response.on ('close', function onClose () {
      doCallback (new Error ('request dropped'));
    });
  
    response.on ('data', function onData (ch) {
      data.push (ch);
      size += ch.length;
    });
  
    response.on ('end', function onEnd () {
      var er = null;
      data = Buffer.concat (data, size) .toString () .trim ();

      if (response.statusCode !== 200) {
        er = new Error ('API error');
        er.code = response.statusCode;
        er.error = errors [response.statusCode];
  
        if (data.match (/<h1>HTTP Status /)) {
          er.error = data.replace (/.*<b>description<\/b> <u>(.+)<\/u><\/p>.*/, '$1');
        }
      } else {
        try {
          data = JSON.parse (data);

          if (data.apikey) {
            delete data.apikey;
          }

          if (!data.success && data.error) {
            er = new Error ('API error');
            err.error = data.error;
            err.data = data;
            data = null;
          }
        } catch (reason) {
          // can't read this
          er = new Error ('invalid response');
          er.error = reason;
          er.data = data;
          data = null;
        }
      }
  
      doCallback (er, data);
    });
  });

  request.end ();
}
