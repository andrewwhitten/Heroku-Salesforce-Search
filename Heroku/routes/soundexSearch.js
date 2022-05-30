/**
 * Route to the Soundex search
 *
 * Description: None
 *
 * @author Andrew Whitten
 * @date  30th May 2022
 */
const express = require('express'); //import express

const router  = express.Router(); 
const soundexSearchController = require('../controllers/soundexSearch'); 
router.post('/soundexSearch', soundexSearchController.newSoundexSearch); 
module.exports = router; // export to use in server.js
