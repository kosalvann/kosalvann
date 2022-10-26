const express = require('express');
const router = express.Router();

// Language middleware
router.use((req, res, next) => {
	const lang = req.acceptsLanguages();
	// Grab the client language code first two char
	const locale = lang[0].slice(0, 2);
	req.lang = (locale) ? locale : 'en';

	// Global website variables
	res.locals = {
		localeCode: req.lang,
		social: { 
			name: `Kosal Vann, Software Engineer at ActiveCampaign`,
			description: `My name is Kosal and I'm a software engineer at ActiveCampaign with a discipline in PHP & JavaScript.`,
			url: `https://kosalvann.com`,
			twitter: `@kosal__`
		}
	}

	next();
});

router.use('/', require('./controllers/home'));

module.exports = router;