// node
const fs = require('fs');
const path = require('path');

// libs
const glob = require('glob');
const mustache = require('mustache');
const express = require('express');

//---------------------------------------------------------
// Load templates
const templates = {
	index: '' + fs.readFileSync('templates/index.mustache'),
	stage: '' + fs.readFileSync('templates/stage.mustache')
};

// Generate ids
const ids = glob.sync('public/shapes/*.json').map((name) => ({ id: path.basename(name, '.json') }));

//---------------------------------------------------------
// Create
const app = express();

// Set static public path
app.use(express.static('public'));

// Index
app.get('/', (request, response) => {
	response.send(mustache.render(templates.index, { ids }));
});

// 3D view
app.get('/:id', (request, response) => {
	response.send(mustache.render(templates.stage, { id: request.params.id }));
});

// Start listening
app.listen(8000);
console.log('started');
