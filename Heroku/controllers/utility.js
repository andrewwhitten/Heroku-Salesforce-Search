/**
 * Common utility functions used in searching
 *
 * Description: None
 * 
 * @author Andrew Whitten
 * @date  30th May 2022
 */

/**
 * Splits a string into a first name and a last name - e.g. 'John Henry Smith'
 * becomes 'John' and 'Smith'
 * @param {*} name 
 * @returns object
 */
function nameSplit(name) {

    var firstName = '';
    var lastName = '';

    // Split name string into array
    var nameArray = name.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );

    // Does a first name exist?
    if(nameArray.length > 0) {

        firstName = nameArray[0];

        // Does a last name exist?
        if(nameArray.length > 1) {

            // Ensure we use very last word
            lastName = nameArray[nameArray.length-1];
        }
    }

    var returnobject = {};
    returnobject.firstName = firstName;
    returnobject.lastName = lastName;

    return returnobject;
}
  
/**
 * Check if HTTPS protocol is being used
 * @param {WebRequest} req 
 * @returns 
 */
function checkProtocol(req) {

    // Determine network protocol used: 
    // 1) Local development will use none 
    // 2) Apps deployed to Heroku must use HTTPS
    let protocol = req.headers['x-forwarded-proto'] || 'none';
  
    // Reject request if app is deployed but protocal is not https.
    // The easiest way to determine that the app is deployed to Heroku 
    // is an environment variable. 
    if (process.env.ON_HEROKU === '1') {

        if (protocol !== 'https') {

            console.log('Search failed with protocol : ', protocol);

            // End the request with a 403 error
            return false;
        }
    }
    // Valid
    return true;
}

/**
 * Gave up looking for a plugin that builds and just ended up using this
 * 
 * https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
 * 
 * @param {*} str 
 * @returns 
 */
function escapeString (str) {
    if (typeof str != 'string')
        return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

module.exports = { nameSplit, checkProtocol, escapeString };