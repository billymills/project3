/*
Billy Mills
CSCI 344
awesome.js
April 4, 2012
*/

var redis = require('redis');
var client = redis.createClient();

exports.index = function(req, res) {
	client.mget(['awesome','http'], function(err, count) {
		if(err) console.log(err)
		else {
			res.render('awesome', {awesomeCount:count[0], httpCount:count[1]});
			
		}
	});
	
	
};	

//exports.http = function(req, res) {
//	client.get('http', function(err, count) {
//		if(err) console.log(err)
//		else {
//			res.render('awesome', {httpCount:count});
//		}
//	});
//};