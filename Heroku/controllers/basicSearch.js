/**
 * Basic search
 *
 * Description: Simple Postgres SQL name search
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
const newBasicSearch = (req, res, next) => {

    // Print status to the console
    console.log('Basic Search initiated: ' + new Date().toISOString());

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

    // Make sure that input is trimmed and sanitized
    var contactName = queryParam.name;

    // Get name values
    var nameResult = utility.nameSplit(contactName);
    var firstName = nameResult.firstName;
    var lastName = nameResult.lastName;

    // Create SQL query for first name search
    var queryString = "SELECT sfid, firstName, lastName FROM salesforce.contact WHERE firstname = '" + firstName + "'";

    if(lastName) {

        // Extend SQL query for last name criterion
        queryString = queryString + " AND lastName = '" + lastName + "';";
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

            if(results && results.rows)
            {
                for (let row of results.rows) {

                    returnValues.push(row);
                }
            }

            done();

            return res.json(returnValues);
        })
    })
};

module.exports = {newBasicSearch};