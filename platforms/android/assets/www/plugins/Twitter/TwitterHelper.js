function initializeTwitter() {
    var root = this;
    cb = window.open(url, '_blank', 'location=no');
    if (cb != null) {
        cb.onLocationChange = function(loc) {
            root.locChanged(loc);
        };
        cb.onClose = function() {
            root.onCloseBrowser()
        };
        cb.onOpenExternal = function() {
            root.onOpenExternal();
        };
    }
    logOut();
}

// GLOBAL VARS
var oauth; // It Holds the oAuth data request
var requestParams; // Specific param related to request
var ref;
var options = {
    consumerKey: 'YOUR Twitter CONSUMER_KEY', // YOUR Twitter CONSUMER_KEY
    consumerSecret: 'YOUR Twitter CONSUMER_SECRET', // YOUR Twitter CONSUMER_SECRET
    callbackUrl: "Call back URL"//http://www.google.com
}; // YOU have to replace it on one more Place
var twitterKey = "twtrKey"; // This key is used for storing Information related

var Twitter = {
    init: function() {
        var storedAccessData, rawData = localStorage.getItem(twitterKey);
        // here we are going to check whether the data about user is already with us.
        if (localStorage.getItem(twitterKey) !== null) {
            // when App already knows data
            storedAccessData = JSON.parse(rawData); //JSON parsing
            options.accessTokenKey = storedAccessData.accessTokenKey; // data will be saved when user first time signin
            options.accessTokenSecret = storedAccessData.accessTokenSecret; // data will be saved when user first first signin
            // javascript OAuth take care of everything for app we need to provide just the options
            oauth = OAuth(options);
            oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                    function(data) {
                        var entry = JSON.parse(data.text);
                        successfulLogin();
                    },
                    function(data) {

                    }
            );
        }
        else {
            // we have no data for save user
            oauth = OAuth(options);
            oauth.get('https://api.twitter.com/oauth/request_token',
                    function(data) {
                        requestParams = data.text;
                        ref = window.open('https://api.twitter.com/oauth/authorize?' + data.text, '_blank', 'location=yes'); // This opens the Twitter authorization / sign in page
                        ref.addEventListener('loadstart', function(event) {
                        });
                        ref.addEventListener('loadstop', function(event) {
                            Twitter.success(event.url);
                        });
                        ref.addEventListener('loaderror', function(event) {
                        });
                        ref.addEventListener('exit', function(event) {
                        });
                    },
                    function(data) {

                        //console.log("ERROR: " + data);
                    }
            );
        }
    },
    /*
     When ChildBrowser's URL changes we will track it here.
     We will also be acknowledged was the request is a successful or unsuccessful
     */
    success: function(loc) {
        // Here the URL of supplied callback will Load
        /*
         Here Plugin will check whether the callback Url matches with the given Url
         */
        if (loc.indexOf("Put Here Your Callback URL") >= 0) { //http://www.google.com
            // Parse the returned URL
            var index, verifier = '';
            var params = loc.substr(loc.indexOf('?') + 1);
            params = params.split('&');
            for (var i = 0; i < params.length; i++) {
                var y = params[i].split('=');
                if (y[0] === 'oauth_verifier') {
                    verifier = y[1];
                }
            }
            // Here we are going to change token for request with token for access
            /*
             Once user has authorised us then we have to change the token for request with token of access
             here we will give data to localStorage.
             */
            oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier=' + verifier + '&' + requestParams,
                    function(data) {
                        var accessParams = {};
                        var qvars_tmp = data.text.split('&');
                        for (var i = 0; i < qvars_tmp.length; i++) {
                            var y = qvars_tmp[i].split('=');
                            accessParams[y[0]] = decodeURIComponent(y[1]);
                        }
                        oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                        // Saving token of access in Local_Storage
                        var accessData = {};
                        accessData.accessTokenKey = accessParams.oauth_token;
                        accessData.accessTokenSecret = accessParams.oauth_token_secret;
                        // Configuring Apps LOCAL_STORAGE
                        localStorage.setItem(twitterKey, JSON.stringify(accessData));
                        oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                function(data) {
                                    var entry = JSON.parse(data.text);
                                    successfulLogin();
                                },
                                function(data) {
                                }
                        );
                        ref.close();
                    },
                    function(data) {
                    }
            );
        }
        else {
            // Just Empty
        }
    },
    tweet: function() {
        var storedAccessData, rawData = localStorage.getItem(twitterKey);

        storedAccessData = JSON.parse(rawData); // Paring Json
        options.accessTokenKey = storedAccessData.accessTokenKey; // it will be saved on first signin
        options.accessTokenSecret = storedAccessData.accessTokenSecret; // it will be save on first login

        // javascript OAuth will care of else for app we need to send only the options
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    var entry = JSON.parse(data.text);
                    Twitter.post();
                },
                function(data) {
                }
        );
    },
    /*
     We now have the data to tweet
     */
    post: function() {
        var currentTimeStamp = new Date().getTime();
        var theTweet = "Test Tweet using Cordova 3.0 or Gretaer By Hardik Bhavsar" + currentTimeStamp;
        oauth.post('https://api.twitter.com/1.1/statuses/update.json',
                {'status': theTweet, // javascript OAuth encodes this
                    'trim_user': 'true'},
        function(data) {
            var entry = JSON.parse(data.text);
            done();
        },
                function(data) {
                    alert("Something went wrong !!!");
                });
    }
}

function done() {
    alert("Twitt Successfull !!!");
}


function successfulLogin() {
    Twitter.tweet();
}

function logOut() {
    window.localStorage.removeItem(twitterKey);
}