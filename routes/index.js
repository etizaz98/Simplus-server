const express = require('express');
const router = express.Router();
const configuration=require('../config/configuration')
const oauth=require('../config/oauth')
const oauthConfig=require('../config/oauthConfig')
const User=require('../Model/User')
const googleUrl=require('../config/googleUrl')




 


/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { Url: googleUrl });
});

router.get('/redirectUrl', function(req, res, next) {
 const userInfo=oauth(req.query.code);

userInfo.then(function(data){

const firstName=data.name.givenName;
const token=data.tokens.access_token;
const email=data.email;
 
  
  if(oauthConfig.emailFilter(email).match('simplusinnovation.com')){
    res.clearCookie();
      res.cookie('name',firstName);
    res.cookie('token',token);
    const clientUrl='http://localhost:8080'

    const user = new User({ name: data.name.givenName});
    user.save().then(() => console.log('User Added in Database'));
    res.writeHead(301, { "Location": clientUrl });
    return res.end();
              }
  else{
      res.render('error', { error:'Not Allowed' });
      }
  
  
});

   
});

module.exports = router;
