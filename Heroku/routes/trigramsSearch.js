const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const trigramsSearchController = require('../controllers/trigramsSearch'); 
// 3.
router.post('/trigramsSearch', trigramsSearchController.newTrigramsSearch); 
// 4. 
module.exports = router; // export to use in server.js
