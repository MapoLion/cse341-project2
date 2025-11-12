const express = require("express");
const mongodb = require('./data/database');
const cors = require('cors');
const app = express();

//PORT
const port = process.env.PORT || 3002;

//CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//ROUTES
app.use('/', require('./routes'));

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