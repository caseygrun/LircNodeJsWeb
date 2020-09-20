var config = require('config');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync; // this works better for macro feature
var util = require('util');
var express = require('express');
var router = express.Router();


var devices = config.get('devices');
var macros = config.get('macros');

var verbs = require('../verbs');




var irsendRoute = '/devices/:device/:directive/:key';

var irsendRouteHandler = function(req, res){
  var directive = req.params.directive;
  var key = req.params.key;
  var device = req.params.device;
  console.log({directive, key, device})
  verbs.irsend({directive, device, key}, {devices}).then((err, result) => {
    res.json({result: result});
  });
};
router.get(irsendRoute, irsendRouteHandler); 
router.post(irsendRoute, irsendRouteHandler);

router.post('/macro/:macro', async function(req, res, next){
  var macroName = req.params.macro;
  var result = await macro({name: macroName}, {macros, devices, verbs});
  res.json({result: result});
});

/* ------------------------------------------------------------------------- */
// UI handlers

router.get('/', function(req, res, next) {
  var key = Object.keys(devices)[0];
  res.render(key, { title: devices[key].title, device: key });
});

require('./roku')(router)

router.get('/devices/:device', function(req, res, next) {
  var device = req.params.device;
  res.render(device, {title: devices[device].title, device: device});
});



module.exports = router;
