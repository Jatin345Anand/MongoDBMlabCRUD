const mongoose = require('../common/connection');
var schema = mongoose.Schema;
var Adminschema = new schema({
    'id':String,
    'age':Number,
    'name':String,
    'password':String
});
var AdminModel = mongoose.model('adminmasters',Adminschema);
module.exports = AdminModel;