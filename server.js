const express = require("express");
const mongodb = require('./data/database');
const bodyParser = require("body-parser");
const app = express();

const passport = require('passport')
const session = require('express-session');
GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

//PORT
const port = process.env.PORT || 3001;

//BODY-PARSER & CORS
app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'GET, POST, PUT, DELETE, OPTIONS'       
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}))
    .use(cors({ origin: '*' }));
    //.use('/', require('./routes/index.js'));



// EXPRESS JSON
app.use(express.json());

//Putting this above the routes would overwrite the public folder route
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'); });
app.use(express.static('public'));

//ROUTES
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});



app.get('/github/callback', passport.authenticate('github', { 
    failureRedirect: 'api-docs', session: false}), //
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
    });


//ERROR Handling
process.on('uncaughtException', (err, origin) => {
    console.log('ERROR Detected: ', err);
    console.log('Exception Origin: ', origin);
});

//MONGODB Database
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});