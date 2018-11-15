const oauthConfig = require('../config/oauthConfig')


const data=async function getGoogleAccountFromCode(code) {
    const auth = oauthConfig.createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    
    auth.setCredentials(tokens);
    const plus = oauthConfig.getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const name=me.data.name;
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return await{
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
      name:name
    };
  }

  module.exports=data;