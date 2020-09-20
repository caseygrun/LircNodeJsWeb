var config = require('config');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var execSync = require('child_process').execSync; // this works better for macro feature
var util = require('util');


async function irsend({directive, device, key}, {devices}) {
  var command = util.format('irsend %s %s %s', directive, devices[device].device, key);
  var result;
  console.log('executing: ' + command);

  return exec(command).then((stdout, stderr) => {
    result = stdout.trim();
    // success returns a blank string, I want to return something back to the browswer
    if(!result){
      result = "success";
    }
    return result
  });  
}

module.exports = {
  irsend
}