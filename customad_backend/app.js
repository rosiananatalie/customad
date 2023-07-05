var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var videoRouter = require('./routes/video');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/video', videoRouter);

module.exports = app;
