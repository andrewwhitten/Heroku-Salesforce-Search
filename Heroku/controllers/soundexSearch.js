/**
 * Trigrams search
 *
 * Description: Search using the Soundex SQL function : https://www.postgresql.org/docs/current/fuzzystrmatch.html
 * 
 * @author Andrew Whitten
 * @date  30th May 2022
 */
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
 const newSoundexSearch = (req, res, next) => {

    // Print status to the console
    console.log('Soundex Search initiated: ' + new Date().toISOString());

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

    var escapedString = utility.escapeString(queryParam.name);
    var nameResult = utility.nameSplit(escapedString);

    var firstName = nameResult.firstName;
    var lastName = nameResult.lastName;

    let queryString = '';

    if(firstName && !lastName) {

        queryString = "SELECT sfid, firstName, lastName FROM salesforce.contact WHERE SOUNDEX(firstName) = SOUNDEX('" + firstName + "');"
    }
    else {

        queryString = "SELECT sfid, firstName, lastName FROM salesforce.contact WHERE SOUNDEX(firstName) = SOUNDEX('" + firstName + "') OR SOUNDEX(lastName) = SOUNDEX('" + lastName + "');"
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

            for (let row of results.rows) {

                returnValues.push(row);
            }

            done();

            return res.json(returnValues);
        })
    })
};

module.exports = {newSoundexSearch};