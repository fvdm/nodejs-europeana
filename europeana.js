/*
Name:         europeana.js
Description:  Unofficial node.js module for the Europeana API
Author:       Franklin van de Meent - https://frankl.in
Source:       https://github.com/fvdm/nodejs-europeana
Feedback:     https://github.com/fvdm/nodejs-europeana/issues
License:      Public Domain / Unlicense (see UNLICENSE file)
              (https://github.com/fvdm/nodejs-europeana/raw/master/UNLICENSE)
*/

var http = require ('http') .request;
var querystring = require ('querystring');
module.exports = {};

// config
module.exports.timeout = 5000;
module.exports.apikey = null;


// errors
// http://www.europeana.eu/portal/api-working-with-api.html#Error-Codes

var errors = {
  400: 'The request sent by the client was syntactically incorrect',
  401: 'Authentication credentials were missing or authentication failed.',
  404: 'The requested record was not found.',
  429: 'The request could be served because the application has reached its usage limit.',
  500: 'Internal Server Error. Something has gone wrong, please report to us.'
};


// get one item
// http://www.europeana.eu/portal/api-record-json.html
module.exports.record = function (id, profile, callback) {
  if (typeof profile === 'function') {
    var callback = profile;
    var profile = 'full';
  }
  talk ('record/'+ id, {profile: profile}, callback);
};

// search items
// http://www.europeana.eu/portal/api-search-json.html
module.exports.search = function (query, vars, callback) {
  if (typeof vars === 'function') {
    var callback = vars;
    var vars = {};
  }
  vars.query = query;
  talk ('search', vars, callback);
};

// livesearch suggestions
// http://www.europeana.eu/portal/api-suggestions-json.html
module.exports.suggestions = function (query, rows, callback) {
  if (typeof rows === 'function') {
    var callback = rows;
    var rows = 10;
  }
  talk ('suggestions', {query: query, rows: rows}, callback);
};


// communicate with the API
function talk (path, fields, callback) {
  if (typeof fields === 'function') {
    var callback = fields;
    var fields = {};
  }

  // prevent multiple callbacks
  var complete = false;
  function doCallback (err, res, meta) {
    if (!complete) {
      complete = true;
      callback (err || null, res || null, meta || null);
    }
  }

  // check API key
  if (!module.exports.apikey) {
    doCallback (new Error ('apikey missing'));
    return;
  }

  // build request
  fields.wskey = module.exports.apikey;

  var query = '?'+ querystring.stringify (fields);

  var options = {
    host: 'europeana.eu',
    path: '/api/v2/'+ path +'.json'+ query,
    method: 'GET',
    headers: {
      'User-Agent': 'europeana.js'
    }
  };

  var request = http (options);

  // request failed
  request.on ('error', function (error) {
    var err = new Error ('request failed');
    err.error = error;
    doCallback (err);
  });

  // request timeout
  request.on ('socket', function (socket) {
    socket.setTimeout (module.exports.timeout);
    socket.on ('timeout', function () {
      request.abort ();
      doCallback (new Error ('request timeout'));
    });
  });

  // response
  request.on ('response', function (response) {
    var data = '';

    // too early disconnected
    response.on ('close', function () {
      doCallback (new Error ('request dropped'));
    });

    // receiving data
    response.on ('data', function (ch) {
      data += ch;
    });

    // process response data
    response.on ('end', function () {
      data = data.trim ();

      if (response.statusCode !== 200) {
        var er = new Error ('API error');
        er.code = response.statusCode;
        er.error = errors [response.statusCode];

        if (!!~data.indexOf ('<h1>HTTP Status ')) {
          er.error = data.replace (/.*<b>description<\/b> <u>(.+)<\/u><\/p>.*/, '$1');
        }
        doCallback (er);
      } else {
        try {
          // json
          data = JSON.parse (data);
        } catch (reason) {
          // can't read this
          var er = new Error ('invalid response');
          er.error = reason;
          er.data = data;
          doCallback (er);
        }

        if (data && !data.success && data.error) {
          var er = new Error ('API error');
          er.error = data.error;
          doCallback (er);
        } else if (data) {
          doCallback (null, data);
        } else {
          doCallback (new Error ('unknown error'));
        }
      }
    })
  })

  // do it
  request.end ();
}
