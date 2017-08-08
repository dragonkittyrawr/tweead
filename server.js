// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
var session = require("express-session");
var passport = require("./assets/config/passport");
var fs = require("fs");
var db = require("./assets/models");
var path = require("path");
var http = require("http").Server(app);

// Sets up the Express App
// =============================================================
var app = express();

app.use(methodOverride("_method"));
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'html');


app.use(express.static(path.join(__dirname, 'public')));

// Static directory
// app.use(express.static(process.cwd() + "/public"));

// Routes
// =============================================================
var routes = require("./assets/controllers/movies_controller.js");

app.use("/", routes);

// app.use(function(req, res) {
//     res.status(404);
//     res.render('404');
// });

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('500', {});
// });

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 8080, function() {
    process.env.PORT == undefined ? console.log("App listening on Port 8080") : console.log("App listening on PORT" + process.env.PORT);
});