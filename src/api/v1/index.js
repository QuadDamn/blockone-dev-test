const express = require('express');
const router = express.Router();
const getLatestBlocks = require('./getLatestBlocks');

router.get('/block/latest/:numberOfBlocks', getLatestBlocks);

module.exports = router;