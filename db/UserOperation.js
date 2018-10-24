// CRUD Operation
const User = require('./schema/userschema');
const PASSWORDHASH = require('password-hash');
const UserOperation = {
    addUser(userObject) {
        console.log("Before Password Generate ",userObject.password);
        userObject.password = PASSWORDHASH.generate(userObject.password);
        console.log("After Password Generate ",userObject.password);
        
        User.create(userObject, (err) => {
            if (err) {
                console.log("Error in record added...");
            } else {
                console.log("Record Added...");
            }
        })
    },
    fetchUser(userObject,request,response) {
        User.find({
            'id': userObject.id
        }, (err, docs) => {
            if (err) {
                console.log("Error occured...");
            } else {
                console.log(docs);
                if (docs && docs.length > 0) {
                    var dbpassword = docs[0].password;
                    var result = PASSWORDHASH.verify(userObject.password,dbpassword);
                    console.log('After verified..',result);
                    if(result){
                        // creation of the session key...
                        console.log(request.session);
                        request.session.lid = docs[0].id;
                        const path = require('path');
                        var temppath = path.normalize(__dirname+"/..");
                        console.log('Temp Path ',temppath);
                        var fullpath = path.join(temppath,"/public/pages/dashboard.html");
                        console.log("Full path ",fullpath);
                        console.log("Session Key is ",request.session.lid);
                        response.sendFile(fullpath);
                        // doubt
                        // response.render('../views/dashboard.ejs',{uid:request.session.lid});
                    }
                    // console.log("Record found ....", docs[0]);
                    // response.send("<h1>"+'Welcome '+docs[0].id+" && "+docs[0].name+"</h1>");
                    // const path = require('path');
                    // var temppath = path.normalize(__dirname+"/..");
                    // var fullpath = path.join(temppath,"/public/pages/dashboard.html");
                    // response.sendFile(fullpath);
                } else {
                    console.log("Invalid USerid and password...");
                    response.send("Invalid Userid or Password...");
                }
            }
        })
    },
    DeleteUser(userObject) {
        User.deleteOne({
            'id': userObject.uid,
            'age': userObject.uage,
            'name': userObject.uname,
            'password': userObject.upassword
        }, (err) => {
            if (err) {
                console.log("Record had not deleted...");
            } else {
                console.log("Record deleted...");
            }
        })
    },
    DeletebyFindUserID(userObject){
        //   User.findByIdAndDelete({})
          User.findOneAndDelete({'id':userObject.uid},(err)=>{
              if(err){
                  console.log('Did not delete by id..');
              }
              else{
                  console.log("Deleted by id...");
              }
          });
    },
    UpdateUser(userObject,NewPasswordUser) {
        User.updateOne({'name':userObject.uname},{$set:{'password':NewPasswordUser}},(err)=>{
            if(err){
                console.log('Passsword did not change...');
            }
            else{
                console.log('Password changed...');
            }
        });
    }
}
module.exports= UserOperation;