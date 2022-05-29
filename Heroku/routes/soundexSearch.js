const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const soundexSearchController = require('../controllers/soundexSearch'); 
// 3.
router.post('/soundexSearch', soundexSearchController.newSoundexSearch); 
// 4. 
module.exports = router; // export to use in server.js
