const fs = require("fs")

var express = require('express');

var app = express();
var cors = require('cors');
const { randomUUID } = require('crypto');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// log in
app.post('/login', function (req, res) {
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)

    // TODO: Make password storage secure lol
    // TODO: Use actual token
    if (users[req.body.username]
        && req.body.password == users[req.body.username].password
        && users[req.body.username].verified) {

        res.send({ token: req.body.username, balance: users[req.body.username].coins_balance })
    } else {
        res.statusCode = 404
        res.send({ error: "404" })
    }
});

// sign up
app.post('/register', function (req, res) {
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)

    if (users[req.body.username]) {
        res.statusCode = 409
        res.send({ error: "409" })
    } else {
        var verification_code = Math.floor(Math.random() * (10000 - 1000) + 1000)
        var public_code = Math.floor(Math.random() * (10000 - 1000) + 1000)

        users[req.body.username] = {
            "password": req.body.password,
            "name": req.body.name,
            "surname": req.body.surname,
            "date_of_birth": req.body.date_of_birth,
            "phone_number": req.body.phone_number,
            "mail": req.body.mail,
            "geo": req.body.geo,
            "coins_balance": 20,
            "verification_code": verification_code,
            "public_code": public_code,
        }
        // send sms with verification_code
        const accountSid = "<Removed>";
        const authToken = "<Removed>";
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: 'This is your verification code for Triftify: ' + verification_code,
                from: '+19705917319',
                // to: req.body.phone_number
                to: '+<phonenumber>' // fixed number for tests
            })
            .then();


        fs.writeFileSync('users.json', JSON.stringify(users));
        res.statusCode = 201
        res.send({ "status": "verification sent", "code": public_code, "username": req.body.username })
    }
});

// user verification
app.post('/verification', function (req, res) {
    const users_file = fs.readFileSync("users.json")
    var users = JSON.parse(users_file)
    if (users[req.body.username].verification_code == req.body.verification_code
        && users[req.body.username].public_code == req.body.code) {
        users[req.body.username].verified = true
        fs.writeFileSync('users.json', JSON.stringify(users));

        res.statusCode = 207
        res.send({ token: req.body.username, balance: users[req.body.username].coins_balance })
    } else {
        res.statusCode = 404
        res.send({ error: "404" })
    }
});


//user ima array objectov po imenu listing
// object listing ima propertije username user-ja, imeListinga, ceno, imageName -  ce klikne nanj v drugem gettu dobi se sliko
// nadgradnja: pošljem mu jih recimo le prvih 30

// poslje array z objekti zgoraj opisane oblike

// user
app.get('/user', function (req, res) {
    console.log(req.query.username)
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    res.send(users[req.query.username])
});

// listing
app.get('/listings', function (req, res) {
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)
    const allListings = [];

    for (let i in users) {
        for (let j in users[i].listings) {
            allListings.push(users[i].listings[j])
        }
    }

    res.send(allListings)
});

// newlisting
app.post('/newlisting', function (req, res) {
    const token = req.headers.authorization
    if (!token) {
        res.statusCode = 401
        res.send({ error: "401" })
        return
    }

    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)

    const id = randomUUID()

    let listing = {
        "id": id,
        "owner": token,
        "title": req.body.title,
        "price": req.body.price,
        "type": req.body.type,
        "gender": req.body.gender,
        "size": req.body.size,
        "description": req.body.description,
        "images": req.body.images
    }

    if (!("listings" in users[token])) {
        users[token].listings = {}
    }

    users[token].listings[id] = listing

    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send(listing)
});

app.get('/images', function (req, res) {

    const name = req.query.name
    //console.log(name)
    const path = require('path');
    let link = path.resolve('images', name);
    //console.log(link);

    res.sendFile(link);
});


// dodajanje slike, in obenem posodobitev listinga.
//v query-ju je podan imagename (tu z malimi crkami)
// za files je podan key pod imenom imagefile

const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const imagename = randomUUID() + ".jpg";
    let sampleFile = req.files.file;
    const path = require('path');
    let prelink = path.resolve('images'); 

    let link = path.join(prelink, imagename);

    if (!fs.existsSync(prelink)) {
        fs.mkdirSync(prelink);
    }

    //console.log(link)
    //console.log(sampleFile);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(link, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }

        res.send({ "image": imagename });
    });
});


app.post('/requestBuy', function (req, res) {
    const token = req.headers.authorization
    if (!token) {
        res.statusCode = 401
        res.send({ error: "401" })
        return
    }

    let id = req.body.listingID
    let owner = req.body.owner

    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)

    if (!("requested" in users[owner].listings[id])) {
        users[owner].listings[id].requested = []
    }

    users[owner].listings[id].requested.push(token)

    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send({ "status": "ok" })
})

app.post("/sell", function (req, res) {
    const token = req.headers.authorization
    if (!token) {
        res.statusCode = 401
        res.send({ error: "401" })
        return
    }

    let buyer = req.body.buyer
    let listingID = req.body.listingID
    let seller = token

    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)

    let listing = users[seller].listings[listingID]
    users[seller].coins_balance += listing.price
    users[buyer].coins_balance -= listing.price

    delete users[seller].listings[listingID]

    fs.writeFileSync('users.json', JSON.stringify(users));
    console.log({ "balance": users[seller].coins_balance })
    res.send({ "balance": users[seller].coins_balance })
})

app.get("/balance", function (req, res) {
    const token = req.headers.authorization
    if (!token) {
        res.statusCode = 401
        res.send({ error: "401" })
        return
    }

    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)

    res.send({ "balance": users[token].coins_balance })
})


var server = app.listen(5000, function () {
    console.log('Node server is running..');
});