var express = require('express');
var path = require('path');
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var compression = require('compression');

var dbUrl = 'mongodb://localhost/mybolg';
mongoose.connect(dbUrl);

var app = express();	//start view
app.use(compression());
app.set('view engine','jade');
app.set('views','./app/views/pages');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: 'mybolg',
    Store: new MongoStore({
    		url: dbUrl,
    		collection:'sessions'
    })
}))

app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname,'public'),{maxAge:7*24*60*60*1000}));
require('./config/routes.js')(app);
app.listen(port);
console.log("-----app.js----- server started on port : "+port );
