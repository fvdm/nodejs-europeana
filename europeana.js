/*
Name:         europeana.js
Description:  Unofficial Node.js module for the Europeana API
Author:       Franklin (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-europeana
License:      Public Domain / Unlicense (see LICENSE file)
*/

module.exports = class Europeana {

  /**
   * Configuration
   *
   * @param   {object}  config
   * @param   {string}  config.wskey            API KEY
   * @param   {number}  [config.timeout=15000]  Request timeout in ms
   */

  constructor ( {

    wskey,
    timeout = 15000,

  } ) {

    this._config = {
      wskey,
      timeout,
    };

  }


  /**
   * Search records
   *
   * @param   {object}  parameters  Method parameters
   *
   * @return  {Promise<array>}
   */

  async search ( parameters ) {
    return this._talk( {
      url: 'https://api.europeana.eu/record/v2/search.json',
      parameters,
    } );
  }


  /**
   * Get a record
   *
   * @param   {string}  id  Record ID
   *
   * @return  {Promise<object>}
   */

  async getRecord ( { id } ) {
    return this._talk( {
      url: `https://api.europeana.eu/record/v2/${id}.json`,
    } );
  }


  /**
   * Generate record thumbnail URL
   *
   * @param   {string}  uri
   * @param   {string}  type
   * @param   {string}  size
   *
   * @return  {Promise<string>}
   */

  async getRecordThumbnailUrl ( { uri, type, size } ) {
    uri = encodeURIComponent( uri );

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

  async _talk ( {

    url,
    parameters = {},
    timeout = this._config.timeout,

  } ) {

    const options = {
      signal: AbortSignal.timeout( parseInt( timeout, 10 ) ),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'nodejs-europeana',
        'X-Api-Key': this._config.wskey,
      },
    };

    parameters = new URLSearchParams( parameters );
    url += '?' + parameters;

    const res = await fetch( url, options );
    const body = await res.text();

    // HTML error
    if ( body.match( /^</ ) ) {
      const errors = {
        400: 'The request sent by the client was syntactically incorrect',
        401: 'Authentication credentials were missing or authentication failed.',
        404: 'The requested record was not found.',
        429: 'The request could be served because the application has reached its usage limit.',
        500: 'Internal Server Error. Something has gone wrong, please report to us.',
      };
 
      const msg = errors[res.status] || res.statusText;
      const error = new Error( `API error: ${msg}` );

      error.code = res.status;
      throw error;
    }

    // Parse JSON data
    const data = JSON.parse( body );

    // API error
    if ( data.error ) {
      const error = new Error( `API error: ${data.error}` );

      error.code = res.status;
      throw error;
    }

    // Success
    data.statusCode = res.status;
    data.headers = res.headers;

    return data;
  }

};
