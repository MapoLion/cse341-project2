const express = require("express");
const mongodb = require('./data/database');
const bodyParser = require("body-parser");
const app = express();

//PORT
const port = process.env.PORT || 3001;

//BODY PARSER
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json());

//ROUTES
app.use('/', require('./routes'));

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