const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const levenshteinSearchController = require('../controllers/levenshteinSearch'); 
// 3.
router.post('/levenshteinSearch', levenshteinSearchController.newLevenshteinSearch); 
// 4. 
module.exports = router; // export to use in server.js

