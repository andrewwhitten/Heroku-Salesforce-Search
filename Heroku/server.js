/**
 * Advanced search web services
 *
 * Description: Provides 4 methods to query a Postgres database that
 * has syncronized Contacts from Salesforce (out of the box, not customized).
 * 
 * @author Andrew Whitten
 * @date  30th May 2022
 */

// Modules used
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const express = require ('express');

// Setup App
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

//Compress all routes
app.use(compression()); 

// Run service
const listener = app.listen(process.env.PORT || 30001, () => {

    // Message to console to indicate running
    console.log('The Salesforce search app is listening on port ' + listener.address().port)
})