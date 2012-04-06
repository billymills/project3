/*
Billy Mills
CSCI 344
awesome.js
April 4, 2012
*/

var redis = require('redis');
var client = redis.createClient();
//var express = require('express');



exports.index = function(req, res) {
	
	client.zrevrange(['awesomeLink', 0, 0], function(error, linkresult) {
		if (error) {
					console.log (error);
		}	
		else {
			res.render('awesome', {link:linkresult});
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

