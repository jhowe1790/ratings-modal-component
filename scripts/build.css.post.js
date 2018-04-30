//ES6 Promise Polyfill
require('es6-promise').polyfill();

var argv = require('minimist')(process.argv.slice(2));

var fs               = require('fs'),
    autoprefixer     = require('autoprefixer'),
    cssnano          = require('cssnano'),
    flexbugfixes     = require('postcss-flexbugs-fixes'),
    glob             = require('glob'),
    postcss          = require('postcss'),
    pxtorem          = require('postcss-pxtorem'),

    // PostCSS Options
    autoprefixerOpts = {
      browsers: [
        'last 4 versions', // Last 4 versions of every other browsers
        'IE >= 9', // IE9 onwards - explicitly
        'not IE <= 8' // But not IE8 or less
      ]
    },

    cssnanoOpts      = {
      zindex: false, // Turn off rebasing the zIndex, because a lot of plugins do this via JS
      discardUnused: false, // Turn off discarding unused @rules for the time being
      autoprefixer: false // Turn off autoprefixing using CSS Nano
    },

    pxtoremOpts      = {
      rootValue: 18,
      replace: false,
      mediaQuery: false
    },

    processor        = postcss(
      [
        flexbugfixes(),
        autoprefixer(autoprefixerOpts),
        // pxtorem(pxtoremOpts),
        cssnano(cssnanoOpts)
      ]);

function init(directory) {
  glob(directory + '.css', {}, render);
}

function processCss(filePath) {

    fs.readFile(filePath, function(err, data) {

      processor.process(data, { from: filePath, to: filePath, map: { inline: false } })
        .then(function (result) {

          fs.writeFileSync(filePath, result.css);
          if ( result.map ) fs.writeFileSync(filePath + '.map', result.map);

        }, function(error) {
          console.log('Error!', error);
        });

    });

}

function render(error, files) {

  for (var i = files.length - 1; i >= 0; i--) {
    processCss(files[i]);
  }

}

init(argv.directory);
