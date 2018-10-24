const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const userRoute = require('./routes/Userroute');
const passportGoogle = require('./utils/middlewares/passportgoogle');
const PASSPORT = require('passport');
const HTTPS = require('https');
const HTTPKEYS = require('./utils/middlewares/httpskeys');
const cors = require('./utils/middlewares/cors');
const session = require('express-session');
const NOCACHE = require('./utils/middlewares/nocache');
const ejs = require('ejs');
// doudt 
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));

// parse application/json
app.use(bodyparser.json());
app.use(PASSPORT.initialize());
app.use(cors);
app.use(NOCACHE);
app.use(session({
    secret:'Its My way OR sky way...',
    resave:false,
    saveUninitialized: false,
    cookie :{ secure:false,maxAge:10*60*1000}
}));
app.set('view engine','ejs');
app.use("/",userRoute);

app.listen(process.env.PORT || 1234,()=>{
    console.log('Server start...');
});