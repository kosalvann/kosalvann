const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const translate = require('../helpers/locale');

// Required by express-recaptcha to get data from body or query.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
	res.render('home', {
		lang: translate[`${req.lang}`]
	});
});

module.exports = router;