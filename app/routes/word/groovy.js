/*
Billy Mills
CSCI 344
awesome.js
April 4, 2012
*/

var redis = require('redis'); //use redis in controller
var client = redis.createClient();

exports.index = function(req, res) {
	client.get('groovy', function(err, count) {
		if(err) console.log(err)
		else {
			res.render('groovy', {groovyCount:count}); //sends to view as local variable
		}
	});
};	