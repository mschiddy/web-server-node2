
/**
 * Module dependencies.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const favicon = require('serve-favicon');

const port = process.env.PORT || 3000;
var app = express();

// all environments
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		text: 'Welcome to this site!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear(),
		text: 'Some text here'
	});
});

app.get('/projects', (req, res) => {	
	res.render('about.hbs', {
		pageTitle: 'Projects Page',
		currentYear: new Date().getFullYear(),
		text: 'My awesome projects will be featured here'
	});
});

app.get('/bad', (req, res) => {
	res.send({
	   error: 'Oops!  Wrong page.'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});