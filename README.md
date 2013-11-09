europeana
=========

Unofficial Node.js module for the Europeana API. Search and lookup art in various archives across Europe.

[Europeana](http://europeana.eu/)

[API documentation](http://europeana.eu/portal/api-introduction.html)


Installation
------------

The version on npm is always tested and stable.

	npm install europeana


The source on Github is the most recent code but can be unreliable.

	npm install git+https://github.com/fvdm/nodejs-europeana


Configuration
-------------

You _must_ specify an API key which you can request >[here](http://europeana.eu/portal/api/registration.html)<.

	apikey    Your API key. Do not use your private key.
	timeout   Expire the request after this amount of milliseconds, default is 5000 (5 sec).


#### Example

```js
europeana.apikey = 'abc123'
```


Callback
--------

Each method requires a callback _function_ to receive the results.

It receives two parameters: `err` and `data`.

	err    Instance of Error, includes stack trace.
	       Set on error, else `null`
	       Properties when available: code, error
	       
	data   Result object.
	       Set if no error
	

#### Example

```js
function myCallback( error, data ) {
	if( err ) {
		console.log( error, error.stack )
	} else {
		console.log( data )
	}
}

europeana.search( 'vincent van gogh', myCallback )
```


#### Errors

	apikey missing     You did not set your API key
	request failed     The request failed, see err.error
	request timeout    The request took too long.
	request dropped    The request ended too early
	invalid response   API returned invalid data
	API error          API returned an error, see err.error and err.code
	unknown error      An unknown error occurred, please submit a ticket in the Github repo


record ( id, [profile], callback )
----------------------------------

Get one record.

	id         required   Record ID.
	profile    option     What information to return, full, similar or params. Combine with spaces.
	callback   required   Your callback function.


API docs: http://europeana.eu/portal/api-record-json.html


#### Example

```js
europeana.record( '/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11', console.log )
```

```js
{ apikey: 'abc123',
  action: 'record.json',
  success: true,
  statsDuration: 138,
  requestNumber: 24,
  object: 
   { type: 'IMAGE',
     title: [ 'Et in Arcadia ego' ],
     about: '/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
     proxies: 
      [ { about: '/proxy/provider/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
          dcCreator: { def: [ 'Poussin, Nicolas (Maler)' ] },
          dcDescription: { def: [ 'Aufbewahrung/Standort: Musée National du Louvre (Paris) Paris' ] },
          dcIdentifier: { def: [ 'Inventarnummer 7300' ] },
          dcRights: { def: [ 'Deutsches Dokumentationszentrum für Kunstgeschichte - Bildarchiv Foto Marburg [Digitales Bild (retrodigitalisiert)]' ] },
          dcSource: { def: [ 'Deutsches Dokumentationszentrum für Kunstgeschichte - Bildarchiv Foto Marburg' ] },
          dcSubject: { def: [ '31 E 52', 'Et in Arcadia ego' ] },
          dcTitle: { def: [ 'Et in Arcadia ego' ] },
          dcType: { def: [ 'Bild', 'Tafelmalerei' ] },
          dctermsExtent: { def: [ 'Höhe x Breite: 85 x 121 cm' ] },
          dctermsMedium: { def: [ 'Öl :', 'Leinwand' ] },
          proxyIn: [ '/aggregation/provider/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11' ],
          proxyFor: '/item/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
          edmType: 'IMAGE',
          europeanaProxy: false },
        { about: '/proxy/europeana/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
          proxyIn: [ '/aggregation/europeana/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11' ],
          proxyFor: '/item/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
          europeanaProxy: true } ],
     aggregations: 
      [ { about: '/aggregation/provider/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
          edmDataProvider: { def: [ 'Bildarchiv Foto Marburg' ] },
          edmIsShownAt: 'http://europeana.eu/api/7271/redirect?shownAt=http%3A%2F%2Fwww.bildindex.de%2Fdokumente%2Fhtml%2Fobj20077046%3Fbt%3Deuropeanaapi&provider=Athena&id=http://www.europeana.eu/resolve/record/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11&profile=full',
          edmObject: 'http://www.bildindex.de/bilder/fr00507c02b.jpg',
          edmProvider: { def: [ 'Athena' ] },
          edmRights: { def: [ 'http://www.europeana.eu/rights/rr-f/' ] },
          webResources: 
           [ { about: 'http://www.bildindex.de/dokumente/html/obj20077046' },
             { about: 'http://www.bildindex.de/bilder/fr00507c02b.jpg' } ] } ],
     europeanaCollectionName: [ '08501_Ag_EU_ATHENA_FotoMarburg' ],
     europeanaCompleteness: 6,
     providedCHOs: [ { about: '/item/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11' } ],
     europeanaAggregation: 
      { about: '/aggregation/europeana/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
        edmLandingPage: 'http://www.europeana.eu/portal/record/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11.html',
        edmCountry: { def: [ 'germany' ] },
        edmLanguage: { def: [ 'de' ] } } } }
```


search ( query, params, callback )
----------------------------------

Find items.

	query      required   Search terms.
	params     option     Filter results, see API docs.
	callback   required   Your callback function.


API docs: http://europeana.eu/portal/api-search-json.html


#### Example

```js
europeana.search( 'et in arcadia ego', {rows: 50}, console.log )
```

```js
{ apikey: 'abc123',
  action: 'search.json',
  success: true,
  requestNumber: 26,
  itemsCount: 16,
  totalResults: 16,
  items: 
   [ { id: '/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11',
       completeness: 6,
       europeanaCollectionName: [ '08501_Ag_EU_ATHENA_FotoMarburg' ],
       index: 0,
       language: [ 'de' ],
       type: 'IMAGE',
       provider: [ 'Athena' ],
       title: [ 'Et in Arcadia ego' ],
       dataProvider: [ 'Bildarchiv Foto Marburg' ],
       dcCreator: [ 'Poussin, Nicolas (Maler)' ],
       rights: [ 'http://www.europeana.eu/rights/rr-f/' ],
       europeanaCompleteness: 6,
       link: 'http://europeana.eu/api/v2/record/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11.json?wskey=abc123',
       guid: 'http://www.europeana.eu/portal/record/08501/03F4577D418DC84979C4E2EE36F99FECED4C7B11.html?utm_source=api&utm_medium=api&utm_campaign=abc123' } ] }
```


suggestions ( query, [rows], callback )
---------------------------------------

Get search suggestions based on your query. Useful for live search.

	query      required   Search terms.
	rows       option     Amount of results, default is 10.
	callback   required   Your callback function.


API docs: http://europeana.eu/portal/api-suggestions-json.html


#### Example

```js
europeana.suggestions( 'laurent de la', 3, console.log )
```

```js
{ action: 'suggestions.json',
  success: true,
  itemsCount: 3,
  totalResults: 3,
  items: 
   [ { term: 'et in archaeology',
       frequency: 37,
       field: 'Subject',
       query: 'what:"et in archaeology"' },
     { term: 'et in archeologia',
       frequency: 5,
       field: 'Subject',
       query: 'what:"et in archeologia"' },
     { term: 'et industrial process archaeology',
       frequency: 2,
       field: 'Subject',
       query: 'what:"et industrial process archaeology"' } ] }
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

For more information, please refer to <http://unlicense.org/>
