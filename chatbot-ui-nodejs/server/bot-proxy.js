var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/api/botCall', function (req, res) {
	var texto = req.body.texto;
	var contexto = req.body.contexto;
	var options = {
		json: req.body,
		url: 'http://localhost:8080/api/registrar',
		method: 'POST'
	};

	request(options, function (error, response, body) {
		console.log("Error: " + error);
		console.log("Body: " + console.log(body));
		return res.status(200).jsonp({
			body
		});
	});

});

module.exports = router;