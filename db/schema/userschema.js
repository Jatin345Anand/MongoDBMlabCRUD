const mongoose = require('../common/connection');
var schema = mongoose.Schema;
var Userschema = new schema({
    'id':String,
    'age':Number,
    'name':String,
    'password':String
});
var UserModel = mongoose.model('users',Userschema);
module.exports = UserModel;