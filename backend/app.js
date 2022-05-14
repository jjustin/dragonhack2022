var express = require('express');
var app = express();


// users = {
//     "username": {
//         "password": "",
//         "name": "",
//         "surname": "",
//         "date_of_birth": 0,
//         "phone_number": "",
//         "mail": "",
//         "coins_balance": 0,
//     },
// }

// verifications = {
//     "username": verification_code 
// }

// log in
app.get('/login', function (req, res) {
    const users_file = require("users")
    var users = JSON.parse(users_file)
    // user exists and the password is correct
    if (users.has(req.username) && req.password.localeCompare(users[req.username].password)) {
        res.send({token: req.username})
    } else {
        res.statusCode = 404
        res.send({error: "404"})
    }
});

// sign up
app.get('/signup', function (req, res) {
    const users_file = require("users")
    var users = new Map(JSON.parse(users_file))
    // user with this username already exists
    if (users.has(req.username)) {
        res.statusCode = 409
        res.send({error: "409"})
    } else {
        // add new user to users (Map)
        users.set(req.username, {"password": req.password, "name": req.name, "surname": req.surname, "date_of_birth": req.date_of_birth,
         "phone_number": req.phone_number, "mail": req.mail, "coins_balance": req.coins_balance})
        // convert to json and write to users.json
        users_file.writeFile('users.json', JSON.stringify(users));
        // save and send verification code 
        const verifications_file = require("verifications")
        var verifications = new Map(JSON.parse(users_file))
        var verification_code = Math.random() * (10000 - 1000) + 1000
        verifications.set(req.username, verification_code)
        users_file.writeFile('verifications.json', JSON.stringify(verifications));
        res.send({verification_code: verification_code})
    }
});

// user verification
app.get('/verification', function (req, res) {
    const verifications_file = require("verifications")
    var verifications = new Map(JSON.parse(users_file))
    if (verifications[req.username].verification_code == req.verification_code) {
        res.statusCode = 207
        res.send()
    } else {
        res.statusCode = 404
        res.send({error: "404"})
    }
});

// listing

app.get('/listing/list', function (req, res) {
    username = users[req.token].username
    if (!username) {
        req.statusCode = 404
        req.send({error: "404"})
        return
    }

    res.send('POST Request');
});

app.put('/listing', function (req, res) {
    // update
    res.send('PUT Request');
});

// request 


var server = app.listen(5000, function () {
    console.log('Node server is running..');
});