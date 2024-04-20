const express = require('express');
const router = express.Router();
const { Addslot,newslot } = require('../Controller/parkingcontroller');


router.post('/addslot', Addslot);
router.post('/newslot', newslot);

module.exports = router;