const express = require('express');
const router = express.Router();
const translate = require("./locales");

const getLocale2CharCode = (langCode) => {
	const lang = langCode ?? {};
	// Grab language code first two char
	const code = lang[0].slice(0, 2);
	return code ? code : 'en';
};

router.use((req, res, next) => {
	/**
	 * Global variables
	 * 
	 * Language middleware
	 */
	req.lang = getLocale2CharCode(req.acceptsLanguages());
	/**
	 * Social meta
	 */
	const socialMetaData = { 
		name: translate[req.lang].page.title,
		description: translate[req.lang].page.description,
		url: `https://kosalvann.com`,
		twitter: `@kosal__`
	};
	/**
	 * Set the global variables
	 */
	res.locals = {
		localeCode: req.lang,
		lang: translate[`${req.lang}`],
		social: socialMetaData
	}

	next();
});

router.use('/', require('./controllers/home'));

module.exports = router;