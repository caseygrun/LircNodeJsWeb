const { RokuClient, Keys } = require('roku-client');

var CLIENT = null;
RokuClient.discover(/* timeout, defaults to 10 seconds */)
	  .then((client) => {
	    console.log(`roku device found at ${client.ip}`);
	    CLIENT = client;
	  })

module.exports = {
	'roku': async function(params, {}) {
		const directive = params.directive;
		switch(directive) {
			case 'launch':
				return CLIENT.launch(params.app)
				break;
			case 'keypress':
				var key = params.key;
				if (key in Keys) {
					key = Keys[key]
				}
				return CLIENT.keypress(key); 
				break;
			case 'text':
				return CLIENT.text(params.text); 
				break;
			default:
				throw Exception('Unrecognized directive "' + directive + '"')
		}
	}
}