const { RokuClient, Keys } = require('roku-client');

module.exports = function(router) {
	var CLIENT = null;

	RokuClient.discover(/* timeout, defaults to 10 seconds */)
	  .then((client) => {
	    console.log(`roku device found at ${client.ip}`);
	    CLIENT = client;
	  })

	router.get('/device/roku', function(req, res, next) {
		CLIENT.apps().then((apps) => (
			res.render('roku', {address: CLIENT.ip, apps: apps})
		))
	})
}