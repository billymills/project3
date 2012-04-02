/*
Billy Mills
CSCI 344
awesome.js
April 4, 2012
*/

var redis = require('redis');
var client = redis.createClient();

exports.index = function(req, res) {
	client.get('cool', function(err, count) {
		if(err) console.log(err)
		else {
			res.render('cool', {coolCount:count});
		}
	});
};	