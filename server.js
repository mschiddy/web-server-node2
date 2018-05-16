
/**
 * Module dependencies.
 */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const favicon = require('serve-favicon');
const publicPath = path.join(__dirname, '/public');

const port = process.env.PORT || 3000;
var app = express();

// all environments
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(publicPath));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		currentYear: new Date().getFullYear(),
		text: 'Welcome to my website!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About',
		currentYear: new Date().getFullYear(),
		text: 'I like to create things, including websites, crafts, and home decor items.'
	});
});

app.get('/projects', (req, res) => {	
	res.render('projects.hbs', {
		pageTitle: 'Projects',
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