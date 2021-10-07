/*
Name:         europeana.js
Description:  Unofficial Node.js module for the Europeana API
Author:       Franklin (https://fvdm.com)
Source:       https://github.com/fvdm/nodejs-europeana
License:      Public Domain / Unlicense (see UNLICENSE file)
*/

const { doRequest } = require ('httpreq');

module.exports = class Europeana {

  /**
   * Configuration
   *
   * @param   {object}  config
   * @param   {string}  config.wskey            API KEY
   * @param   {number}  [config.timeout=15000]  Request timeout in ms
   */

  constructor ({
    wskey,
    timeout = 15000,
  }) {
    this._config = {
      wskey,
      timeout,
    };

    this._errors = {
      400: 'The request sent by the client was syntactically incorrect',
      401: 'Authentication credentials were missing or authentication failed.',
      404: 'The requested record was not found.',
      429: 'The request could be served because the application has reached its usage limit.',
      500: 'Internal Server Error. Something has gone wrong, please report to us.',
    };
  }


  /**
   * Search records
   *
   * @param   {object}  parameters  Method parameters
   *
   * @return  {Promise<object>}
   */

  async search (parameters) {
    return this._talk ({
      url: 'https://api.europeana.eu/record/v2/search.json',
      parameters,
    });
  }


  /**
   * Get a record
   *
   * @param   {string}  id  Record ID
   *
   * @return  {Promise<object>}
   */

  async getRecord ({ id }) {
    return this._talk ({
      url: `https://api.europeana.eu/record/v2/${id}.json`,
    });
  }


  /**
   * Generate record thumbnail URL
   *
   * @param   {string}  uri
   * @param   {string}  type
   * @param   {string}  size
   *
   * @return  {Promise<object>}
   */

  async getRecordThumbnailUrl ({ uri, type, size }) {
    uri = encodeURIComponent (uri);

    return `https://api.europeana.eu/thumbnail/v2/url.json?uri=${uri}&type=${type}&size=${size}`;
  }


  /**
   * Communicate with API
   *
   * @param   {string}  url              Request URL
   * @param   {object}  [parameters]     Request parameters
   * @param   {number}  [timeout=15000]  Request timeout in ms
   *
   * @return  {Promise<object>}
   */

  async _talk ({
    url,
    parameters = {},
    timeout = this._config.timeout,
  }) {
    const options = {
      url,
      parameters,
      timeout,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'nodejs-europeana',
      },
    };

    options.parameters.wskey = this._config.wskey;

    const res = await doRequest (options);

    // Process HTML error
    if (res.body.match (/^</)) {
      const error = new Error (this._errors[res.statusCode]);

      error.code = res.statusCode;
      throw error;
    }

    // Parse JSON data
    const data = JSON.parse (res.body);

    // Process API error
    if (data.error) {
      const error = new Error (data.error);

      error.code = res.statusCode;
      throw error;
    }

    // Success
    data.statusCode = res.statusCode;
    data.headers = res.headers;
    return data;
  }

};
