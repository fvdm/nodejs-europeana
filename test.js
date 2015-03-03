var util = require ('util');

// Setup
// $ env EUROPEANA_KEY= EUROPEANA_TIMEOUT= npm test
var app = require ('./') (
  process.env.EUROPEANA_APIKEY || null,
  process.env.EUROPEANA_TIMEOUT || 5000
);


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error (label +': \033[1m\033[31mERROR\033[0m\n');
    console.error (util.inspect (err, false, 10, true));
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if(testErrors.length === 0) {
      console.log (label +': \033[1m\033[32mok\033[0m');
    } else {
      console.error (label +': \033[1m\033[31mfailed\033[0m ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}

var testData = {
  query: 'who:"laurent de la hyre"',
  rows: 10,
  profile: 'full',
  id: '/9200365/BibliographicResource_1000055039444'
}


queue.push (function () {
  var props = {
    query: testData.query
  };
  app ('search', props, function (err, res) {
    doTest (err, 'search', [
      ['data type', typeof res === 'object']
    ]);
  });
});


queue.push (function () {
  var props = {
    profile: testData.profile
  };
  app ('record'+ testData.id, props, function (err, res) {
    doTest (err, 'record', [
      ['data type', typeof res === 'object']
    ]);
  });
});


queue.push (function () {
  var props = {
    query: 'laurent de la hyre',
    rows: 10
  };
  app ('suggestions', props, function (err, res) {
    doTest (err, 'suggestions', [
      ['data type', typeof res === 'object']
    ]);
  });
});


// Start the tests
console.log ('Running tests...\n');
queue [0] ();
