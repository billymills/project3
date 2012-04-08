var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//var link;                                                                                                                                                                                                                      
var client = redis.createClient();
var url = "";

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
				if (tweet.entities.urls.expanded_url !== undefined) { 
					url = tweet.entities.urls[0].expanded_url; 
					//link = "ex";
					console.log(url);
					
					}
				else if (tweet.entities.urls.url !== undefined) {
					url = tweet.entities.urls[0].url;
					//link = "short";
					}
					console.log(url);
					//client.zadd(['awesomeLink', 1, link]);
					client.zadd('awesomeLink', 1, tweet.entities.urls[0].expanded_url);
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