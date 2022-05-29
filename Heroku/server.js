require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');

const express = require ('express');

const app = express();
app.use(helmet());
app.use(express.json());

// Import routes
const routeLevenshtein = require('./routes/levenshteinSearch'); 
const routesTrigrams = require('./routes/trigramsSearch'); 
const routesSoundex = require('./routes/soundexSearch'); 
const routesBasic = require('./routes/basicSearch'); 

// Use routes
app.use('/', routeLevenshtein); 
app.use('/', routesTrigrams); 
app.use('/', routesSoundex); 
app.use('/', routesBasic); 

app.use(compression()); //Compress all routes

const listener = app.listen(process.env.PORT || 30001, () => {

    // Message to console to indicate running
    console.log('The Salesforce search app is listening on port ' + listener.address().port)
})