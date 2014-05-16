android-twitter-cordova3.0
==========================

Android twitter cordova 3.0 or greater plugin using oauth

Android 


1. Create cordova project using Command prompt
     e.g. cordova create TwitterSharingApp hardik.m.bhavsar TwitterSharingApp 

2.  cd TwitterSharingApp

3. add platform that require i m using Android
    e.g. cordova platform add android

4. Now add the plugin for InAppBrowser 
	e.g. cordova plugin add org.apache.cordova.inappbrowser

5. Now open your project in eclipse (Go to TwitterSharingApp > platform > android)
	File > import > Android > Existing Android Code Into Workspace

6. To show `assets/www` or `res/xml/config.xml`, go to:
    Project > Properties > Resource > Resource Filters
	And delete the exclusion filter.

7. Now Clean Your Project. Might be all error removed from your project.

8. Download project zip file from git clone. Than go to platform > android > assets > www > plugins and copy the twitter folder in to your project.

9. Now give reference for following files in index.html
	e.g.

	<script src="plugins/Twitter/jquery-1.11.0.js" type="text/javascript" charset="utf-8"></script>
        <script src="plugins/Twitter/jsOAuth-1.3.6.js" type="text/javascript" charset="utf-8"></script>
        <script src="plugins/Twitter/TwitterHelper.js" type="text/javascript" charset="utf-8"></script>
		
10. Now go to TwitterHelper.js and change Twitter consumerKey, consumerSecret and Callback URL.
		
11. Sample index.html

	<html>
    <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <title>Twitter Sharing App</title>
    </head>
    <body>
        
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        
        <!-- TWITTER -->
        <script src="plugins/Twitter/jquery-1.11.0.js" type="text/javascript" charset="utf-8"></script>
        <script src="plugins/Twitter/jsOAuth-1.3.6.js" type="text/javascript" charset="utf-8"></script>
        <script src="plugins/Twitter/TwitterHelper.js" type="text/javascript" charset="utf-8"></script>
        
        <!--
         Twitter Testing
         ===============
        -->
        
        <h4> Twitter App </h4>
        <table border="1">
            <tr>
                <th>Login using Twitter</th>
                <th>
                    <button id="loginBtn" onclick="Twitter.init()">Login</button>
                    <button id="logoutBtn" onclick="logOut();">Logout</button>
                </th>
            </tr>
            <tr id="tweetText" style="display:none;">
                <td colspan="2"><textarea id="tweet" style="display:none;"></textarea></td>
            </tr>
            
            <tr><td colspan="2"><div id="welcome">Please Login to use this app</div></td></tr>
            <tr><td colspan="2"><div id="welcome">If You are already login it will directly tweet your pre-defined message.</div></td></tr>
        </table>
       
</html>
</body>
