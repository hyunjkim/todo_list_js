const bodyParser = require("body-parser");
const express = require("express");
const todoRouter = express.Router();

todoRouter.use(bodyParser.urlencoded({extended: false}));

todoRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});
todoRouter.get("/", function (req,res) {
  res.render("index");
});


module.exports = todoRouter;
