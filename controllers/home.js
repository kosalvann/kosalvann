const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const translate = require('../helpers/locale');
const sendEmail = require('../helpers/email');

// Required by express-recaptcha to get data from body or query.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
	sendEmail('Kosal', process.env.ADMIN_EMAIL_ADDRESS, 'Yes, this is just a test. Disregard this test. Thanks.')

	res.render('home', {
		lang: translate[`${req.lang}`]
	});
});

module.exports = router;