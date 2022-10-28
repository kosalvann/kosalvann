require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')({origin: true});
const { engine } = require('express-handlebars');
const routes = require('./routes');
const port = process.env.PORT || 8080;
/** Dependencies */
const translate = require("./locales");
const locale2CharCode = require('./helpers/locale2CharCode');

app.use(cors);
app.options('*', cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Website middleware
app.use((req, res, next) => {
	/**
	 * Language code
	 */
	 req.lang = locale2CharCode(req.acceptsLanguages());
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
	  * Set the global variables for views
	  */
	 res.locals = {
		 localeCode: req.lang,
		 lang: translate[`${req.lang}`],
		 social: socialMetaData
	 }
	next();
});

// Declare all routes
app.use('/', routes);

// Template configurations
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

// Static files location
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '5000' }));

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

/**
 * @desc Catch-all for non-existing routes and pages
 * @return {string}
 */
app.get('*', (req, res) => {
	// res.status(404).send('Not found');
	res.render('404', {
		bodyClassName: 'not-found',
		notFoundPage: true
	});
});