var config = require('config');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var execSync = require('child_process').execSync; // this works better for macro feature


const ALLOWED_DIRECTIVES = ['SEND_ONCE']
const KEY_FORMAT = /^KEY_[\w_-]+$/

async function irsend({directive, device, key}, {devices}) {
  // test user input
  if(!directive) { directive = 'SEND_ONCE' }
  if (!ALLOWED_DIRECTIVES.includes(directive)) {
    throw Exception('Directive "' + directive + "' not allowed.")
  }
  if (!device in devices){
    throw Exception('Device "' + device + "' not found.")
  }
  const lirc_device = devices[device].device;
  if (!KEY_FORMAT.test(key)) {
    throw Exception('Key "' + key + "' not allowed.")
  }

  var command = util.format('irsend %s %s %s', directive, lirc_device, key);
  console.log('executing: ' + command);

  return exec(command).then({stdout, stderr}) => {
    var result = stdout.trim();
    if(!result){
      result = "success";
    }
    return result
  });  
}

module.exports = {
  irsend
}