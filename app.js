require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')({origin: true});
const { engine } = require('express-handlebars');
const routes = require('./routes');
const port = process.env.PORT || 3000;

app.use(cors);
app.options('*', cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Language middleware
app.use((req, res, next) => {
	const lang = req.acceptsLanguages();
	// Grab the client language code first two char
	const locale = lang[0].slice(0, 2);
	req.lang = (locale) ? locale : 'en';
	next();
});

// Declare all routes
app.use('/', routes);

// Template configurations
app.engine('.hbs', engine({ extname: '.hbs' }));
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
		bodyClassName: 'not-found'
	});
});