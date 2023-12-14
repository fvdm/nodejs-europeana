## 2.0.0 (2023-12-14)

##### Chores

* **github:**
  *  Bump github/codeql-action from 2 to 3 ([#26](https://github.com/fvdm/nodejs-europeana/pull/26)) ([d0b1dc83](https://github.com/fvdm/nodejs-europeana/commit/d0b1dc838af452777fd4f617cc94388e6c29b59b))
  *  Update node action ([2a4f8685](https://github.com/fvdm/nodejs-europeana/commit/2a4f8685e23ee2d93ec865deaf39f9756602124d))
  *  Bump actions/setup-node from 3 to 4 ([#25](https://github.com/fvdm/nodejs-europeana/pull/25)) ([05f15393](https://github.com/fvdm/nodejs-europeana/commit/05f15393b4f7a35eac9080fc0ca97433b5bd08c2))
  *  Bump actions/checkout from 3 to 4 ([#24](https://github.com/fvdm/nodejs-europeana/pull/24)) ([eb7b9506](https://github.com/fvdm/nodejs-europeana/commit/eb7b95067c665a2e589fda36105b0272c02e9aa4))
  *  Update node workflow ([eb5e6a9e](https://github.com/fvdm/nodejs-europeana/commit/eb5e6a9e9542c1162a158ec0904354bda447703b))
  *  Allow manual workflow runs ([f838d05b](https://github.com/fvdm/nodejs-europeana/commit/f838d05be1c89ad13586ecb93e218ca7ac075b7c))
  *  Bump github/codeql-action from 1 to 2 ([#22](https://github.com/fvdm/nodejs-europeana/pull/22)) ([adca08d2](https://github.com/fvdm/nodejs-europeana/commit/adca08d22302aaf57da84f71f5e1f40d51fe3ce4))
  *  Bump actions/checkout from 2 to 3 ([#21](https://github.com/fvdm/nodejs-europeana/pull/21)) ([7f0a94a4](https://github.com/fvdm/nodejs-europeana/commit/7f0a94a4d8f82f64cb62482c43944fca67530ba1))
  *  Bump actions/setup-node from 2 to 3 ([#20](https://github.com/fvdm/nodejs-europeana/pull/20)) ([074df1c4](https://github.com/fvdm/nodejs-europeana/commit/074df1c4599df27012e312cdb827789435d09c37))
* **package:**  Only major version on dev dep ([d85eed34](https://github.com/fvdm/nodejs-europeana/commit/d85eed349ede94915773633fe0a17f352e5142dd))
* **ci:**
  *  Replaced Travis by Github action ([d8ecdc6e](https://github.com/fvdm/nodejs-europeana/commit/d8ecdc6edd90f5005830d76332bfe4b2ecbd242c))
  *  Added Github configs ([6c7c76ad](https://github.com/fvdm/nodejs-europeana/commit/6c7c76add39e77e1b0f21cf134a0b4ead99a7b6c))
* **dev:**
  *  Clean up gitignore ([324d93a1](https://github.com/fvdm/nodejs-europeana/commit/324d93a19a007f8e968a3bdfd499817fb3298f6c))
  *  Added editorconfig ([ccef820f](https://github.com/fvdm/nodejs-europeana/commit/ccef820fe5cc0ba442584ca05435d8479e17f4b4))
  *  Added nyc output to gitignore ([13be029c](https://github.com/fvdm/nodejs-europeana/commit/13be029ce0daee37615556248e75fc3b7ebf4a9b))

##### Documentation Changes

* **readme:**
  *  Removed default column from table ([6feb7841](https://github.com/fvdm/nodejs-europeana/commit/6feb784140433abca2e30bc7f86b1ebcb85cae26))
  *  Fixed another typo ([58769565](https://github.com/fvdm/nodejs-europeana/commit/58769565eea9e2826530f6f6dd29d96cfa7334ca))
  *  Fixed code block and typo ([421206a1](https://github.com/fvdm/nodejs-europeana/commit/421206a1bc2f1d49b6d3198751816dab5c62682a))
  *  More useful documentation ([e59bdf09](https://github.com/fvdm/nodejs-europeana/commit/e59bdf09ea23e2528b7207529544968db45b023c))
  *  Update API docs link ([9be66bc4](https://github.com/fvdm/nodejs-europeana/commit/9be66bc497526e8a65a4cd06f476d6921b56e8c5))
  *  Cleanup and removed bitHound badges ([8e534807](https://github.com/fvdm/nodejs-europeana/commit/8e53480721415a4c69c76982fc93e65e63132ec0))
*  Updated API key text ([b99be801](https://github.com/fvdm/nodejs-europeana/commit/b99be801e3b930cd43a7a90629bf7724d3391b64))

##### Bug Fixes

*  Read the fetch response stream only once ([892ef89c](https://github.com/fvdm/nodejs-europeana/commit/892ef89ccf508ab33f1f881ea351f7f878725b1c))
*  Restored html error catching ([16b98ebd](https://github.com/fvdm/nodejs-europeana/commit/16b98ebddbaf027520d571492b00cf6e8a0e30a2))
*  Timeout must be a number ([42de26ea](https://github.com/fvdm/nodejs-europeana/commit/42de26ead43c85a1c4d07fcab808007b0c42171f))
*  upgrade httpreq from 0.4.24 to 0.5.1 ([faadbf11](https://github.com/fvdm/nodejs-europeana/commit/faadbf1117dd547e63c5d213341723809a9632b4))

##### Other Changes

*  HTTP/2 does not contain status texts ([c0f0be9e](https://github.com/fvdm/nodejs-europeana/commit/c0f0be9e84b8f689ba8b2a053fc6474943ccdb15))

##### Refactors

*  Use new X-Api-Key header ([#27](https://github.com/fvdm/nodejs-europeana/pull/27)) ([50400593](https://github.com/fvdm/nodejs-europeana/commit/50400593f232dd9fe792db57bdade98c25458d83))
*  Removed generic errors ([eb3e4fb2](https://github.com/fvdm/nodejs-europeana/commit/eb3e4fb2e1e89458dca2e4a2af2a207722660156))
*  Improved error handling ([80d82643](https://github.com/fvdm/nodejs-europeana/commit/80d8264382007539ef98b908b65159eaee05e4bb))
*  Replaced httpreq dep with native fetch ([2875c0ad](https://github.com/fvdm/nodejs-europeana/commit/2875c0adc0e18e1af70d3dd1b45f6355f104f3e0))

#### 1.1.3 (2017-12-12)

##### Chores

* **package:**
  * Update httpreq dependency ([e305ea35](https://github.com/fvdm/nodejs-europeana/commit/e305ea356536de93bf05cfbd3311382ef14bbd4b))
  * Reduce dev deps to dotest ([7df07839](https://github.com/fvdm/nodejs-europeana/commit/7df078394d9bb0ea3dd2583030e38c48b83ea586))
  * update dependencies ([c55d2ad2](https://github.com/fvdm/nodejs-europeana/commit/c55d2ad204d07e709f129cf4f07f1d3bef0e3624))
  * Update dotest dev dep ([4d933a00](https://github.com/fvdm/nodejs-europeana/commit/4d933a005c362fa48b8128fdcff0a1b779f5faa2))
  * Update dev deps ([b8c9597b](https://github.com/fvdm/nodejs-europeana/commit/b8c9597be6dc1c12ef2a3c73a93cb12f7a45b639))

##### Documentation Changes

* **badges:** Moved GreenKeeper badge ([2c3b16cc](https://github.com/fvdm/nodejs-europeana/commit/2c3b16ccfc3e4a3d417d29cfc409a664a74eb5f3))
* **readme:**
  * add Greenkeeper badge ([56114f03](https://github.com/fvdm/nodejs-europeana/commit/56114f037a3fc59c015b9b45b79b76708ce549ec))
  * Add coffee button to Author ([c9d1ebe9](https://github.com/fvdm/nodejs-europeana/commit/c9d1ebe982fc504ce1f75cfcb8af2a75ff99c272))
  * Cleaner author line ([116d6120](https://github.com/fvdm/nodejs-europeana/commit/116d61207645b3c9cd1d0fb63f495ae1135a38c8))

##### Tests

* **config:**
  * Remove ecmaVersion from .eslintrc ([f8e8de80](https://github.com/fvdm/nodejs-europeana/commit/f8e8de8049d31882357baa37e5710fb513cd4a3b))
  * Update Travis CI node versions ([ac203f59](https://github.com/fvdm/nodejs-europeana/commit/ac203f59c9fd2bd9b3c8662d056be11309ec38f1))
* **main:** Convert syntax to ES6 ([6a0b3fda](https://github.com/fvdm/nodejs-europeana/commit/6a0b3fdae4034dde0c425f5f0012c3083ae297dc))

#### 1.1.2 (2016-12-23)

##### Chores

* **develop:** Added bitHound config ([b29112a1](https://github.com/fvdm/nodejs-europeana/commit/b29112a1e589d43e9cc6079749b94f8bf4b5e7eb))
* **package:**
  * Replaced test runner and dev deps by dotest ([4e201aca](https://github.com/fvdm/nodejs-europeana/commit/4e201aca141fe7121d5a53f23f55fec5a3e4503f))
  * update eslint to version 3.0.0 ([101f2d32](https://github.com/fvdm/nodejs-europeana/commit/101f2d321efca320c91d4904d9ff4a68c9d0c734))

##### Documentation Changes

* **badges:** Replaced Gemnasium with bitHound ([339590fb](https://github.com/fvdm/nodejs-europeana/commit/339590fb5a3553cb94e024686cf6472ba9484e99))

##### Refactors

* **package:** Minimum supported node v4.0 ([0a7c562a](https://github.com/fvdm/nodejs-europeana/commit/0a7c562a5f1f380c577c49508fdd29385bfe9a89))

##### Tests

* **mains:** More specific checks on content ([07072291](https://github.com/fvdm/nodejs-europeana/commit/07072291b264426f9b3f37553a11fa64ea2178d8))
* **config:** Use dynamic node versions on Travis CI ([b1ec55ac](https://github.com/fvdm/nodejs-europeana/commit/b1ec55acd2773a68019cc2df6718de43cf771a35))
* **runner:** Log commits and cleanup ([caa23597](https://github.com/fvdm/nodejs-europeana/commit/caa235979274d583a043e02dd487ed7c3cb41837))
* **lint:** Update eslint to ES6 ([c8f81798](https://github.com/fvdm/nodejs-europeana/commit/c8f817987e0638eb56b6f10697ed6a8b0ce65ea8))

#### 1.1.1 (2016-6-15)

##### Chores

* **package:**
  * Add gitignore config ([4edaeb4c](https://github.com/fvdm/nodejs-europeana/commit/4edaeb4c580e4cfbcf8a3ac3049b6efbbbf7ea46))
  * Update deps versions ([abcc01a5](https://github.com/fvdm/nodejs-europeana/commit/abcc01a5a3ab9c1f084afa20c15d27e3aa7b1573))
  * update eslint to version 2.5.0 ([e9589c84](https://github.com/fvdm/nodejs-europeana/commit/e9589c846dbba538353eab8a1f0e6553fa9fa86e))
* **style:** Remove extra semicolon ([6bc99803](https://github.com/fvdm/nodejs-europeana/commit/6bc9980301495789a00f2fc0af35318aeef9619f))

##### Documentation Changes

* **badges:**
  * Fixed bad copies ([43d9ac63](https://github.com/fvdm/nodejs-europeana/commit/43d9ac63ebe95026b497043a66f58606738b1f32))
  * Add coverage status ([80bfa63c](https://github.com/fvdm/nodejs-europeana/commit/80bfa63cfb3a4ed75b50f1d324e0f5aef421fe15))
  * Add Gemnasium dependencies status ([cdf18f3e](https://github.com/fvdm/nodejs-europeana/commit/cdf18f3e94f127f12fc9dac4c927ab6e1d26f64c))
  * Add npm version for changelog ([610093b6](https://github.com/fvdm/nodejs-europeana/commit/610093b65ee8ae73353b81a8acbb52f96d7cf83f))

##### Bug Fixes

* **error:** res can be unavailable ([0e568739](https://github.com/fvdm/nodejs-europeana/commit/0e568739cb9fcbc2f59fb67301b0a8c832585f2c))

##### Other Changes

* **undefined:**
  * minimum dotest v1.7.0 ([15a48c50](https://github.com/fvdm/nodejs-europeana/commit/15a48c50f49c1eff07b567e0367532ada5bf33f8))
  * always run both test commands ([3a7adaf6](https://github.com/fvdm/nodejs-europeana/commit/3a7adaf68e43cdab8d5f51634d1584f5b22c9e1e))
  * dev dep eslint 2.5.0 is broken ([e09f6359](https://github.com/fvdm/nodejs-europeana/commit/e09f635924a0d5eb7bee19e8f7f6ec56e39a1283))

##### Refactors

* **cleanup:** Remove unused var ([c673b346](https://github.com/fvdm/nodejs-europeana/commit/c673b346e1f5bedb6db602f44375f3996eb77e6c))
* **http:** Error processing and callback ([feee4999](https://github.com/fvdm/nodejs-europeana/commit/feee499938dc150b56b455c08a0eecbda4b5bff4))
* **style:** Cleaner functions ([7265ec98](https://github.com/fvdm/nodejs-europeana/commit/7265ec98d8fc382afb7346b79ca58fe29b809372))

##### Tests

* **script:**
  * Fixed fatal syntax typo ([4d464a6e](https://github.com/fvdm/nodejs-europeana/commit/4d464a6ee568dd494b5fb48013a659e94dd5fab1))
  * Don't quit when no key is set ([cb7c7d90](https://github.com/fvdm/nodejs-europeana/commit/cb7c7d90af9be73701e60e32e07e9cf6f2a11cfe))
* **tests:**
  * Add Error: request failed ([718610f5](https://github.com/fvdm/nodejs-europeana/commit/718610f589bebea608f1e5bdd830fd8c23e27d24))
  * Moved apikey missing to bottom ([1d943ed8](https://github.com/fvdm/nodejs-europeana/commit/1d943ed8ee7483f49e247d68e558c2f730d444f7))
  * Add Error: API error ([352f0c61](https://github.com/fvdm/nodejs-europeana/commit/352f0c61a613060095c0b4d33dc203a8444aae65))
  * Add Error: apikey missing ([ece408c1](https://github.com/fvdm/nodejs-europeana/commit/ece408c130e0825b6e23fffb46e8d1f8ee4fb896))
* **cleanup:**
  * Minor clean up ([02a33375](https://github.com/fvdm/nodejs-europeana/commit/02a3337519c3c53a6faa07c09c0a51b6f56cb00d))
  * Cleaner dotest use ([b03d0385](https://github.com/fvdm/nodejs-europeana/commit/b03d03852438ec8cdc2b3fd07488db5e2f54e9a8))
* **package:**
  * Run test.sh on npm test ([076e57bb](https://github.com/fvdm/nodejs-europeana/commit/076e57bbf9edac480e4446f4821f141eafd8aec2))
  * Add coverage dev deps ([8ed8133c](https://github.com/fvdm/nodejs-europeana/commit/8ed8133cf7f691535383535008eb8c2251522cfa))
* **runner:** Add test.sh script ([ea3a2dd2](https://github.com/fvdm/nodejs-europeana/commit/ea3a2dd2421432595f8a9fd01001a74898a08ea4))
* **undefined:**
  * add node v6 to Travis config ([206e7040](https://github.com/fvdm/nodejs-europeana/commit/206e70409afd27d1c0cae687fa77c2383ced7e5a))
  * check API key before running methods ([b8f94500](https://github.com/fvdm/nodejs-europeana/commit/b8f945005189773315345136a3cf9b82530f0285))
  * removed pause between tests ([592d93e7](https://github.com/fvdm/nodejs-europeana/commit/592d93e7d1e289f1989fa64064eaa077da2e7ab2))
  * pause 2 seconds between tests ([b5277e4b](https://github.com/fvdm/nodejs-europeana/commit/b5277e4b45689ae7536440f35a357880866c63e3))

