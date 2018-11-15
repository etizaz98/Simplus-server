const oauthConfig=require('./oauthConfig')

const urlGoogle=function() {
      const auth = oauthConfig.createConnection(); // this is from previous step
      const url = oauthConfig.getConnectionUrl(auth);
      return url;
    }

    module.exports =urlGoogle;