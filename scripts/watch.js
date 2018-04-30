var argv = require('minimist')(process.argv.slice(2));
var gaze = require('gaze');
var exec = require('child_process').exec;

gaze(argv._, function(err, watcher) {

    // On changed/added/deleted
    this.on('all', function(event, filepath) {
      var fileext = filepath.split('.').pop();
      var task = '';
      if(fileext == 'scss') {
        task = 'make css';
      }
      if(fileext == 'js') {
        task = 'make js_lint; make js';
      }
      exec(task, function(error, stdout, stderr) {
        if(error === null) {
          console.log(stderr);
          console.log('Task "' + task + '" run successfully');
          if(stdout) {
            console.log(stdout);
          }
        } else {
          console.log('Task "' + task + '" failed:');
          console.log(error);
        }
      });
    });

});
