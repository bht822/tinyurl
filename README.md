# URL Shortneing Service 
backend for URL shorteining service

## Most of the URL shortening services follow this pattern :
- User enters a really long url
- The service returns a tiny URL of the form hostname/UniqueId
- When user goes to hostname/UniqueId , then the service redirects the user to the really long website
- Trick to redirect is using ``` res.redirect(301, ReallyLongURL) ```for express application

### This application does so as well
#### Get Started 
- Get a mongoDB database string 
- Replace ``` mongoURI , dbName and collection ```
- ``` clone the repo ```
- ``` npm i ```
- ``` npm start ```
- Send a POST request with body as:
 ```javascript 
 {"origional_url":"ReallyLongURL"} 
 ```
 - You will receive an id , use this id and go to localhost:8080/id , this will redirect you to the really long URL
 - Ya' ll kow the rest :) Cheers
