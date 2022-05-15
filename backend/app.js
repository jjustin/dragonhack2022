
var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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
app.post('/login', function (req, res) {
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
app.post('/signup', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)

    if (users[req.body.username]) {
        res.statusCode = 409
        res.send({error: "409"})
    } else {
        users = new Map(Object.entries(users))
        users.set(req.body.username, {"password": req.body.password, "name": req.body.name, "surname": req.body.surname, "date_of_birth": req.body.date_of_birth,
        "phone_number": req.body.phone_number, "location":"","mail": req.body.mail, "coins_balance": req.body.coins_balance, "listing": []})
        
        fs.writeFileSync('users.json', JSON.stringify(users));
        console.log(users)

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
app.post('/verification', function (req, res) {
    const fs = require("fs")
    const verifications_file = fs.readFileSync("verifications.json")
    var verifications = JSON.parse(verifications_file)
    if (verifications[req.body.username] == req.body.verification_code) {
        res.statusCode = 207
        let usr = req.body.username
        verifications = new Map(Object.entries(verifications))
        verifications.delete(usr)
        fs.writeFileSync('verifications.json', JSON.stringify(verifications));
        res.send({"status": "ok"})
    } else {
        res.statusCode = 404
        res.send({error: "404"})
    }
});


//user ima array objectov po imenu listing
// object listing ima propertije username user-ja, index, ime listinga, ceno, url -  ce klikne nanj v drugem gettu dobi se sliko
// nadgradnja: pošljem mu jih recimo le prvih 30

// poslje array z objekti zgoraj opisane oblike

// user
app.post('/user', function (req, res) { 
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    res.send(users[req.body.username])
});

// listing
app.get('/listing', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    const allListings = [];
    
    for (let i in users) {
        for(let j in users[i].listing) {
            allListings.push(users[i].listing[j])
        }
    }
    
    res.send(allListings)
});

// newlisting
app.post('/newlisting', function (req, res) {
    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    
    for (let i = 0;users[req.body.username].listing.length; i++) {
        if (users[req.body.username].listing[i].imeListinga == req.body.imeListinga) {
            res.sendStatus = 404
            res.send({error: "404"})
            return
        }
    }
    users[req.body.username].listing.push({"username": req.body.username, "imeListinga": req.body.imeListinga, "cena" : req.body.cena, "opis": req.body.opis, "url": req.body.url})
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send({"status": "ok"})
});

app.get('/images', function (req, res) {
    
    const name = req.query.name
    console.log(name)
    const path = require('path');
    let link = path.resolve('images', name);
    //console.log(link);

    res.sendFile(link);
});


//listingPicture
// poda mi username in index,
    

// // request
// app.get('/request', function (req, res) { 
// });

// // accept request
// app.get('/accept', function (req, res) { 
// });


// seller comfirmation
app.post('/seller', function (req, res) {  // body: seller username, buyer username, item index
    const fs = require("fs")

    const comfirmations_file = fs.readFileSync("comfirmations.json")
    var comfirmations = JSON.parse(comfirmations_file)
    for (let i = 0; i < comfirmations.length; i++) {
        if (comfirmations[i].seller == req.body.seller && comfirmations[i].buyer == req.body.buyer 
            && comfirmations[i].index == req.body.index) {
            comfirmations[i].seller_comf = true
            if (comfirmations[i].buyer_comf == true) {
                
                const users_file = fs.readFileSync("users.json")
                var users = JSON.parse(users_file)
                let price = users[req.body.seller].listing[req.body.index].cena
                if (users[req.body.buyer].coins_balance >= price) {
                    users[req.body.buyer].coins_balance -= price
                    users[req.body.seller].coins_balance += price
                    fs.writeFileSync('users.json', JSON.stringify(users));
                    comfirmations.splice(i,1)
                } else {
                    res.statusCode = 404
                    res.send({error: "404"})
                }
            }
            break
        }
    }
    
    fs.writeFileSync('comfirmations.json', JSON.stringify(comfirmations));
    res.send({"status": "ok"})

});

// buyer comfirmation
app.post('/buyer', function (req, res) { 
    const fs = require("fs")

    const comfirmations_file = fs.readFileSync("comfirmations.json")
    var comfirmations = JSON.parse(comfirmations_file)
    for (let i = 0; i < comfirmations.length; i++) {
        if (comfirmations[i].seller == req.body.seller && comfirmations[i].buyer == req.body.buyer 
            && comfirmations[i].index == req.body.index) {
            comfirmations[i].buyer_comf = true
            if (comfirmations[i].seller_comf == true) {
                const users_file = fs.readFileSync("users.json")
                var users = JSON.parse(users_file)
                let price = users[req.body.seller].listing[req.body.index].cena
                if (users[req.body.buyer].coins_balance >= price) {
                    users[req.body.buyer].coins_balance -= price
                    users[req.body.seller].coins_balance += price
                    fs.writeFileSync('users.json', JSON.stringify(users));
                    comfirmations.splice(i,1)
                } else {
                    res.statusCode = 404
                    res.send({error: "404"})
                }
            }
            break
        }
    }
    
    fs.writeFileSync('comfirmations.json', JSON.stringify(comfirmations));
    res.send({"status": "ok"})
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});