/**
 * Route to the Trigrams search
 *
 * Description: None
 *
 * @author Andrew Whitten
 * @date  30th May 2022
 */
const express = require('express'); //import express

const router  = express.Router(); 
const trigramsSearchController = require('../controllers/trigramsSearch'); 
router.post('/trigramsSearch', trigramsSearchController.newTrigramsSearch); 
module.exports = router; // export to use in server.js
