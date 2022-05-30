/**
 * Route to the basic search
 *
 * Description: None
 *
 * @author Andrew Whitten
 * @date  30th May 2022
 */
const express = require('express'); //import express

const router  = express.Router(); 
const basicSearchController = require('../controllers/basicSearch'); 
router.post('/basicSearch', basicSearchController.newBasicSearch); 
module.exports = router; // export to use in server.js