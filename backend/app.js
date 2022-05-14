
var express = require('express');
var app = express();

app.use(express.json());

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
//     "username":{ verification_code: 5555} 
// }

// log in
app.get('/login', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)

    if (users[req.body.username] && req.body.password == users[req.body.username].password) {
        res.send({token: req.body.username})
    } else {
        res.statusCode = 404
        res.send({error: "404"})
    }
});

// sign up
app.get('/signup', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)

    if (users[req.body.username]) {
        res.statusCode = 409
        res.send({error: "409"})
    } else {
        users = new Map(Object.entries(users))
        users.set(req.body.username, {"password": req.body.password, "name": req.body.name, "surname": req.body.surname, "date_of_birth": req.body.date_of_birth,
        "phone_number": req.body.phone_number, "mail": req.body.mail, "coins_balance": req.body.coins_balance})
        
        fs.writeFileSync('users.json', JSON.stringify(users));
        const verifications_file = fs.readFileSync("verifications.json")
        var verifications = JSON.parse(verifications_file)
        verifications = new Map(Object.entries(verifications))

        var verification_code = Math.floor(Math.random() * (10000 - 1000) + 1000)        
        verifications.set(req.body.username, verification_code)
        //!!!!!! sent code on sms
        fs.writeFileSync('verifications.json', JSON.stringify(verifications));
        res.send({"status": "verification sent"})
    }
});

// user verification
app.get('/verification', function (req, res) {
    const fs = require("fs")
    const verification_file = fs.readFileSync("verifications.json")
    var verifications = JSON.parse(verification_file)
    if (verifications[req.body.username] == req.body.verification_code) {
        res.statusCode = 207
        res.send({"status": "ok"})
    } else {
        res.statusCode = 404
        res.send({error: "404"})
    }
});








//user ima array objectov po imenu listing
// object listing ima propertije username user-ja, index, ime listinga, ceno,  -  ce klikne nanj v drugem gettu dobi se sliko
// nadgradnja: pošljem mu jih recimo le prvih 30

// poslje array z objekti zgoraj opisane oblike


// listing
app.get('/listing', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    console.log(users)
    const allListings = [];
    
    for (let i in users) {
        console.log(i)
        for(let j in users[i].listing) {
            console.log(users[i].listing)
            console.log(j)
            allListings.push(users[i].listing[j])
        }
    }
    
    res.send(allListings)
    
});

// app.get('/listing/list', function (req, res) {
//     username = users[req.token].username
//     if (!username) {
//         req.statusCode = 404
//         req.send({error: "404"})
//         return
//     }

//     res.send('POST Request');
// });

// app.put('/listing', function (req, res) {
//     // update
//     res.send('PUT Request');
// });

// request 


var server = app.listen(5000, function () {
    console.log('Node server is running..');
});