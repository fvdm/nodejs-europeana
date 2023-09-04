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
const EuropeanaAPI = require ('europeana');
const europeana = new EuropeanaAPI ({
  wskey: 'abc123',
});

// console.log is too limited
function out (data) {
  console.dir (data, {
    depth: null,
    colors: true,
  });
}


// Search
europeana.search ({
  query: 'et in arcadia ego',
  rows: 5,
})
  .then (out)
  .catch (console.error)
;


// Record
europeana.getRecord ({
  id: '08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
})
  .then (out)
  .catch (console.error)
;
```


## Installation

`npm install europeana`


## Configuration

You can request an API key **[here](https://pro.europeana.eu/pages/get-api)**

param     | type   | default | description
:---------|:-------|:--------|:-----------
wskey     | string |         | API key
[timeout] | number | `5000`  | Request timeout in ms


```js
const EuropeanaAPI = require ('europeana');
const europeana = new EuropeanaAPI ({
  wskey: 'abc123',
  timeout: 5000,
});
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

[Franklin](https://fvdm.com)
| [Buy me a coffee](https://fvdm.com/donating)
