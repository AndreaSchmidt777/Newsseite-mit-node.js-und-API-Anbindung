
const port = 3001;
const express = require('express');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const { response } = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const routing = require('./routes/index');




const server = express();

server.set('viewDir', 'views');

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());
server.use(express.static('public'));
server.use(session({
    secret: process.env.SESSION_SECRET || 'Please_SET_session_SeCreT',
    resave: false,
    saveUninitialized: true
}));
server.use((req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn;
    res.locals.user = req.session && req.session.user;
    next();
});

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}));

server.set('view engine', 'html');

server.use('/', routing);

server.listen(process.env.PORT, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});









