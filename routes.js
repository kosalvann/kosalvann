const express = require('express');
const router = express.Router();

router.use('/', require('./controllers/home'));
router.use('/contact', require('./controllers/contact'));

module.exports = router;