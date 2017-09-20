const nunjucks = require('nunjucks');
const express = require('express');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes')
const main = express();// creates an instance of an express mainlication
const PORT = 3000;

main.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

main.set('view engine','html');
main.engine('html',nunjucks.render);
nunjucks.configure('views', {
    autoescape: true,
    express: main,
    watch: true,
    noCache:true
});

main.use(express.static(__dirname + 'public'));
main.use(express.static(__dirname + 'routes'));
main.use(express.static(__dirname + 'views'));
main.use('/',todoRoutes); // routes to todoRoutes.js

main.listen(PORT,function(){
	console.log('PORT:', PORT);
});

