const utility = require('./utility'); 

// Postgres database connection pool
const { Pool } = require('pg');

// Initialize Postgres database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * 
 * @param {WebRequest} req 
 * @param {WebResult} res 
 * @param {*} next 
 * @returns 
 */
const newTrigramsSearch = (req, res, next) => {

    // Print status to the console
    console.log('Trigrams Search initiated: ' + new Date().toISOString());

    if(!utility.checkProtocol(req)) {
        return res.status(403).send('SSL required');
    }

    // Get the parameters from the JSON payload in the request body
    let queryParam = req.body;

    if(queryParam) {

        if(!queryParam.name) {

            // Return empty when no value provided
            return [];
        }
    }
    else {
        // Return empty when no value provided
        return [];
    }

    var nameResult = utility.nameSplit(queryParam.name);

    var firstName = nameResult.firstName;
    var lastName = nameResult.lastName;

    let queryString = 'SET pg_trgm.similarity_threshold = 0.3; ';

    // If one name but not two names provided
    if(firstName && !lastName) {

        queryString = queryString + "SELECT sfid, firstName, lastName, GREATEST( similarity(firstName, '" + firstName + "'), similarity(lastName, '" + firstName + "') ) AS score FROM salesforce.contact WHERE firstName % '" + firstName + "' OR lastName % '" + firstName + "' ORDER BY score desc;";
    }
    else { // Both names provided
        queryString = queryString + "SELECT sfid, firstName, lastName, GREATEST(similarity(firstName, '" + firstName + "'), similarity(lastName, '" + lastName + "')) AS score FROM salesforce.contact WHERE firstName % '" + firstName + "' OR lastName % '" + lastName + "' ORDER BY score desc;";
    }

    pool.connect(function(err, client, done) {

        if(err) {

            // Print connection to console if not working
            console.log( process.env.DATABASE_URL );

            // Close the client
            done();

            return res.json('Postgres connection failed. ' + err.message);
        }

        console.log('Search query: ' + queryString);

        var returnValues = [];

        client.query(queryString, function(err, results) {

            var queryResult = '';

            for (let row of results[1].rows) {

                returnValues.push(row);
            }

            done();

            return res.json(returnValues);
        })
    })
};

module.exports = {newTrigramsSearch};
