# europeana

Unofficial Node.js module for the Europeana API.
Search and lookup art in various archives across Europe.

[![npm](https://img.shields.io/npm/v/europeana.svg?maxAge=3600)](https://github.com/fvdm/nodejs-europeana/blob/master/CHANGELOG.md)
[![Build Status](https://github.com/fvdm/nodejs-europeana/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-europeana/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-europeana/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-europeana?branch=master)

* [Europeana](https://europeana.eu/)
* [API documentation](https://pro.europeana.eu/page/apis)


## Usage example

```js
const EuropeanaAPI = require( 'europeana' );
const europeana = new EuropeanaAPI( {
  wskey: 'abc123',
} );

// console.log is too limited
function out( data ) {
  console.dir( data, {
    depth: null,
    colors: true,
  } );
}


// Search
europeana.search( {
  query: 'et in arcadia ego',
  rows: 5,
} )
  .then( out )
  .catch( console.error )
;
```


## Installation

`npm install europeana`


## Configuration

You can request an API key **[here](https://pro.europeana.eu/pages/get-api)**

param      | type   | default | description
:----------|:-------|:--------|:-----------
wskey      | string |         | API key
[endpoint] | string | API*    | Override endpoint before the path
[timeout]  | number | `15000` | Request timeout in ms

\* Endpoint defaults to `https://api.europeana.eu`


```js
const EuropeanaAPI = require( 'europeana' );
const europeana = new EuropeanaAPI( {
  wskey: 'abc123',
  timeout: 5000,
} );
```


## Errors

All methods have proper error handeling through `Promise.reject`.
API errors are also caught this same way.
Either parsed from the JSON response or translated from the HTTP code when the API returns HTML.


## Methods

Each method takes the arguments in object notation.
They all return a Promise.


### Search
**( { ... } )** : array

Perform a search in the Europeana database.

param | type  | description
:-----|:------|:-----------
...   | mixed | One or multiple parameters

[Available params](https://pro.europeana.eu/page/search#get-started)


#### Example

```js
europeana.search( {
  query: 'et in arcadia ego',
  rows: 5,
} )
  .then( out )
  .catch( console.error )
;
```


### getRecord
**( { id } )** : object

Get one specific record.

param | type   | description
:-----|:-------|:-----------
id    | string | Record identifier

[ID spec](https://pro.europeana.eu/page/intro#identifying-records)


#### Example

```js
europeana.getRecord( {
  id: '08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
} )
  .then( out )
  .catch( console.error )
;
```


### getRecordThumbnailUrl
**( { uri, type, size } )** : string

Get the thumbnail URL for a record.
The resource `uri` is provided in the record `edmPreview` field.

param | type   | description
:-----|:-------|:-----------
uri   | string | Media resource URL
type  | string | Media resource type
size  | string | `w200` or `w400`

[API docs](https://pro.europeana.eu/page/record#thumbnails)


#### Example

```js
europeana.getRecord( {
  id: '08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
} )
  .then( data => europeana.getRecordThumbnailUrl( {
    uri: data.edmPreview,
    type: 'IMAGE',
    size: 'w400',
  } ) )
  .then( out )
  .catch( console.error )
; 
```

Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org/>


Author
------

[Franklin](https://frankl.in)
| [Buy me a coffee](https://frankl.in/tip)
