const express = require('express');
require('express-group-routes');
const app = express();
const multimediaController = require('./../controllers/multimediaController');

app.group('/',  router => {
    router.post('/profic/:id', multimediaController.uploadProfic)
    router.get('/profic/:id', multimediaController.getProfic)
})

module.exports = app