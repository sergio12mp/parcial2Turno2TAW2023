// IMPORTACIÓN DE MÓDULOS  /////////////////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const morgan = require("morgan");
const sequelize = require("sequelize");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./routes/index');


// APP y RENDERS  //////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', routes);


app.get('/', function(req, res){
    res.send("Prueba");
});



app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});



// setting another error program
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export app
module.exports = app;