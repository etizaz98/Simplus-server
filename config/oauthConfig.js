const {google} = require('googleapis');
const configuration=require('../config/configuration')



const googleConfig={
  clientId: configuration.clientId, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: configuration.clientSecret, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: configuration.RedirectUrl // this must match your google api settings
}

const defaultScope =[
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
]

module.exports={
  
  createConnection:function() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
    },
  

  
  
  
     getConnectionUrl:function(auth) {
      return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
      });
    },
  
    emailFilter:function(str) {
      return str.split('@')[1];
  },
  
  
    
  
     getGooglePlusApi:function(auth) {
      return google.plus({ version: 'v1', auth });
    }
  
  
  
    
  
   


}