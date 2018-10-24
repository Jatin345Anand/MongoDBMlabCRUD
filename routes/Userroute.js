const express = require('express');
const Router = express.Router();
const USERCRUDDB = require('../db/Testcrud');
const USEROPEARATIONS = require('../db/UserOperation');
const PASSPORT = require('passport');
const USER = require('../models/UserModel');
const ADMIN = require('../models/AdminModel');
Router.get('/changeProfile', (request, response) => {
    if (request.session && request.session.lid) {
        response.send('You can update your profile...');
    } else {
        response.redirect("/pages/login.html");
        // const path = require("path");
        // var tempPath = path.normalize(__dirname+"/..");
        // console.log("Temp Path ",tempPath);
        // var fullPath = path.join(tempPath,"/public/login.html");
        // console.log("Full path ",fullPath);
        // console.log("Session Key is ",request.session.id);

        // response.sendFile(fullPath);
    }
});
Router.post('/pages/login', (request, response) => {
    var UID = request.body.lid;
    var UPASS = request.body.lpassword;

    var User = new USER(UID, '', UPASS, 0);
    console.log(User);
    USEROPEARATIONS.fetchUser(User, request, response);
    // if (UID == UPASS) {
    //     response.send('Welcome '+UID);
    // } else {
    //     response.send('Invalid ID or PASSWORD');
    // }
});
Router.post('/pages/register', (request, response) => {
    var RID = request.body.rid;
    var RPASS = request.body.rpassword;
    var RAGE = request.body.rage;
    var RNAME = request.body.rname;
    response.send('Welcome ' + RID + RPASS + RAGE + RNAME);
    var USer = new USER(RID, RNAME, RPASS, RAGE);
    USEROPEARATIONS.addUser(USer);

    // Forget password then password changed...
    // USEROPEARATIONS.UpdateUser(USer, 'JoyAnand12345');
    console.log("User or Admin data is ", request.body.rid, RPASS, RNAME, RAGE);
});
Router.get('/loginwithgoogle',PASSPORT.authenticate('google',{
    scope:['profile']
}));
Router.get('/google/callback',PASSPORT.authenticate('google',{
    session:false}),(request,response)=>{
      response.send('welcome');             
});
Router.get('/download',(request,response)=>{
   const FILELOCATION = '/Users/jatinanand/Documents/ VsApril18/Node/MongoDBMLabCRUD/assets/downloads/mobile.jpeg';
   response.download(FILELOCATION);
});
// userRoute.get('/questions', (request, response) => {
//     var questions = {
//         id: 10,
//         name: 'JS Stands for',
//         ans1: 'JavaScript',
//         ans2: 'Java Snake',
//         ans3: 'Both',
//         ans4: 'None of These',
//         score: 5
//     };
//     //var json = JSON.stringify(questions);
//     response.json(questions);
// });
module.exports = Router;