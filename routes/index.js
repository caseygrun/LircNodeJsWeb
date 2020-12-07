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

var irsendRouteHandler = function(req, res, next){
  const directive = req.params.directive || req.body.directive;
  const key = req.params.key || req.body.key;
  const device = req.params.device || req.body.device;

  console.log({directive, key, device})

  verbs.irsend({directive, device, key}, {devices})
    .then((err, result) => {
      res.json({result: result});
    })
    .catch(next);
};
router.get(irsendRoute, irsendRouteHandler); 
router.post(irsendRoute, irsendRouteHandler);
router.post('/irsend', irsendRouteHandler);


router.post('/macro', async function(req, res, next){
  var macroName = req.params.macro;
  var result = await verbs.macro({name: macroName}, {macros, devices, verbs});
  res.json({result: result});
});

/* ------------------------------------------------------------------------- */
// UI handlers

router.get('/', function(req, res, next) {
  var key = Object.keys(devices)[0];
  res.render(key, { title: devices[key].title, device: key });
});

require('./roku')(router, { verbs, devices })

router.get('/devices/:device', function(req, res, next) {
  var device = req.params.device;
  res.render(device, {title: devices[device].title, device: device});
});



module.exports = router;
