/*
Billy Mills
CSCI 344
awesome.js
April 4, 2012
*/

var redis = require('redis');
var client = redis.createClient();

exports.index = function(req, res) {
	//client.zrevrange(['awesomeLink', 0, 0], function(error, linkresult) {
	
	
	
	client.zrevrange('awesomeLink', 0, 10, function(error, linkresult) { // 0, -1 works
		var linkArray = new Array();
		
		
		
		if (error) {
			console.log (error);
		}	
		
		else if (linkresult) {
			for (i=0; i<=10; i++) {
				if (linkresult[i]) {
					linkArray[i]=linkresult[i];
				} //end if
				else {
					linkresult[i] = "";
				} //end else
			} //end for	
				
		} //end else if		
		
		
			res.render('awesome', {link:linkresult[0],
									link2:linkresult[1]});
			
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

