const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const basicSearchController = require('../controllers/basicSearch'); 
// 3.
router.post('/basicSearch', basicSearchController.newBasicSearch); 
// 4. 
module.exports = router; // export to use in server.js