const mongoose = require('mongoose');
mongoose.connect('mongodb://etizaz:etizaz98@ds041377.mlab.com:41377/simplus');

const users = mongoose.model('Users', { name: String });




module.exports=users;