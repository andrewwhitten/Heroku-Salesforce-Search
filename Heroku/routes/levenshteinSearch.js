/**
 * Route to the Levenshtein search
 *
 * Description: None
 *
 * @author Andrew Whitten
 * @date  30th May 2022
 */
const express = require('express'); //import express

const router  = express.Router(); 
const levenshteinSearchController = require('../controllers/levenshteinSearch'); 
router.post('/levenshteinSearch', levenshteinSearchController.newLevenshteinSearch); 
module.exports = router; // export to use in server.js

