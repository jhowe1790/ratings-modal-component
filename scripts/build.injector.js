var injector = require('assetinjector');
injector({
  source: 'public/index.php',
  basePaths: ['public/_css', 'public/_js'],
  omit: 'public'
});
