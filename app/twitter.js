var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');
//var express = require('express');

//var word = "awesome";
var url;
//create redis client                                                                                                                                                                                                                       
var client = redis.createClient();

//if the 'awesome' key doesn't exist, create it        
//instead of waiting use callback function
//parameters specified by API error usually goes first
//all this is not necessary node will set awesome
/*
client.exists('awesome', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('awesome', 0); //create the awesome key
    };
});
*/

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            
            try {
				//test for expanded URLs
				if (tweet.entities.urls.expanded_url !== undefined) { 
					URL = tweet.entities.urls[0].expanded_url; 
					console.log(URL);
					}
				//test for shortened URLs
				else if (tweet.entities.urls.url !== undefined) {
					URL = tweet.entities.urls[0].url; //test for url
					}

					console.log(URL); //display the URL 

					//store the URL in a sorted set in REDIS
					client.zadd('awesomeLink', 1, URL); 
				}

				catch (error) {
				}
         	/*
           for(var i = 0; i < tweet.entities.urls.length; i++) {
				console.log(tweet.entities.urls[i]);
				console.log(tweet.text);
				//if word is in the tweet text, increment counter of that link in that set
				if(tweet.text.match(tweet.entities.urls[i].url && /awesome/)) {
					client.zadd('awesome', 1, tweet.entities.urls[i].url);
				}
				if(tweet.text.match(tweet.entities.urls[i].url && /cool/)) {
					client.zadd('cool', 1, tweet.entities.urls[i].url);
				}
				if(tweet.text.match(tweet.entities.urls[i].url && /gnarly/)) {
					client.zadd('gnarly', 1, tweet.entities.urls[i].url);
				}
					
			}
			
            
            if(tweet.text.match(/cool/)) {
                client.incr('cool');
            } //end cool if
            
             if(tweet.text.match(/rad/)) {
                client.incr('rad');
            } //end rad if
            
             if(tweet.text.match(/gnarly/)) {
                client.incr('gnarly');
            } //end gnarly if
            
             if(tweet.text.match(/groovy/)) {
                client.incr('groovy');
            } //end groovy if
            */
        });
    }
);