require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')({origin: true});
const Handlebars = require('handlebars');
const hbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello, World');
})

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

/**
 * @desc Catch-all for non-existing routes and pages
 * @return {string}
 */
app.get('*', (req, res) => {
	res.status(404).send('Not found');
});