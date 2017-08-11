// ***************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// ***************************************************************
// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var Movie = require("../models/movie_dbSync.js");
var User = require("../models/movie_dbSync.js");
var cheerio = require("cheerio");
var db = require("../models");
var request = require("request");
var passport = require("../config/passport");
var session = require("express-session");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var fs = require("fs");
var path = require("path");

// Routes
// =============================================================
//display index page

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

router.get("/index", function(req, res) {
    res.redirect("/");
});

router.get('/search', isAuthenticated, function(req, res) {
    // console.log("user ", req.user);
    res.render('search');
});

router.get("/signup", function(req, res) {
    // If the user already has an account send them to the login page
    if (req.user) {
        res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "./pages/signup.html"));
});

// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        res.json({
            userName: req.user.userName,
            id: req.user.id
        });
    }
});

router.get("/login", function(req, res) {

    console.log("++++++++++++++++++++++++++++");
    console.log("status 1: " + res.statusCode);
    console.log("++++++++++++++++++++++++++++");
    res.sendFile(path.join(__dirname, "./pages/login.html"));
});

router.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("++++++++++++++++++++++++++++");
    console.log("status 5: " + res.statusCode);
    console.log("++++++++++++++++++++++++++++");
    res.json('/members');
});

router.post("/api/signup", function(req, res) {
    // console.log(req.body);
    db.user.findOrCreate({
        where: { userName: req.body.userName },
        defaults: { password: req.body.password, name: req.body.name }

    }).then(function() {
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        console.log(err);
        res.json(err);
    });
});

module.exports = router;