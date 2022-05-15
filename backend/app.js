
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
// object listing ima propertije username user-ja, imeListinga, ceno, imageName -  ce klikne nanj v drugem gettu dobi se sliko
// nadgradnja: pošljem mu jih recimo le prvih 30

// poslje array z objekti zgoraj opisane oblike


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

app.get('/images', function (req, res) {
    
    const name = req.query.name
    //console.log(name)
    const path = require('path');
    let link = path.resolve('images', name);
    //console.log(link);

    res.sendFile(link);
    
    
});






//ustvarjanje listinga
// user ne sme imeti dveh listingov z enakim listingIme-nom!!!!!!!!!!!!!!!!
// Samo tako lahko vem, kateremu listingu pripada slika.








// dodajanje slike, in obenem posodobitev listinga.
//v query-ju je podan imagename (tu z malimi crkami), username, in listingname
// za files je podan key pod imenom imagefile

const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const imagename = req.query.imagename;
  let sampleFile = req.files.imagefile;
  const username = req.query.username;
  const listingname = req.query.listingname;
  const path = require('path');
  let prelink = path.resolve('images'); // '/Users/joe/joe.txt' if run from my home folder

  let link = path.join(prelink, imagename);

  //console.log(link)
  //console.log(sampleFile);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(link, function(err) {

    const fs = require("fs")
    const users_file = fs.readFileSync("users.json")
    const users = JSON.parse(users_file)

    let temp = 0;
    for (let i in users[username].listing) {
        if (users[username].listing[i].imeListinga == listingname) {
            
            users[username].listing[i].imageName = imagename;
            
            fs.writeFileSync('users.json', JSON.stringify(users))
            temp = 1;
            break;
        }
    }
    if(temp == 0) {
        return res.status(500).send("Ni listinga.");

    }

    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});







var server = app.listen(5000, function () {
    console.log('Node server is running..');
});