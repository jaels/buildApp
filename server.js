var express = require('express'),
app = express(),
cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session'),
// csrf = require('csurf'),
// csrfProtection = csrf({cookie: true}),
bodyParser = require('body-parser'),
db = require('./db');


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(cookieSession({
    secret: 'secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
// app.use(csrfProtection);
// app.use(function(req, res, next) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     return next();
// });



app.post('/checkBuilding', function(req,res) {
    var address = req.body.address;
    var placeId = req.body.placeId;
    req.session.address = address;
    req.session.placeId = placeId;
    db.checkBuilding(placeId).then(function(result) {
        if(result.rows.length>0) {
            req.session.buildingId = result.rows[0].id;
            req.session.address = result.rows[0].address;
            res.json({success:true});
        }
        else {
            req.session.address = req.body.address;
            res.json({success:false});
        }
    })
})




app.get('/registerBuilding', function(req,res) {
    var address = req.session.address;
    var placeId = req.session.placeId;
    db.insertBuilding(address,placeId).then(function(result) {
        req.session.buildingId = result.rows[0].id;
        res.json({success:true, file:address});
    });
});

app.post('/checkUser', function(req,res) {
    var requestedEmail = req.body.email;
    var requestedPassword = req.body.password;
    db.checkEmail(requestedEmail).then(function(result) {
        if (result.rows.length===0) {
            res.send('No such user, please register');
        }
        else {
            var listedPassword = result.rows[0].password;
            var id=result.rows[0].id;
            var firstname=result.rows[0].firstname;
            var lastname=result.rows[0].lastname;
            var address = result.rows[0].address;
            var email=result.rows[0].email;
            var floor = result.rows[0].email;
            var buildingSpec = result.rows[0].building_specifications;
            var apt_number=result.rows[0].apt_number;
            var building_id =result.rows[0].building_id;

            db.checkPassword(requestedPassword,listedPassword).then(function(doesMatch) {
                if(doesMatch===true) {
                    req.session.buildingId = building_id;
                    req.session.user = {
                        id:id,
                        address:address,
                        firstname:firstname,
                        lastname:lastname,
                        email:email,
                        floor:floor,
                        buildingSpec:buildingSpec,
                        apt_number:apt_number
                    };
                    res.json({success: true});
                }

                else {
                    res.json({success: false});
                }
            })

        }
    })
})

app.post('/registerUser', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var floor = req.body.floor;
    var aptNumber = req.body.aptNumber;
    var buildingSpec = req.body.buildingSpec;
    var email = req.body.email;
    var password = req.body.password;
    var buildingId = req.session.buildingId;
    var address = req.session.address;

    if(email.indexOf('@')>-1 && firstname && lastname && floor && email && password ) {
        db.checkEmail(email).then(function(result) {
            if(result.rows.length===0) {
                db.hashPassword(password).then(function(hash) {
                    var hashPassword = hash;
                    db.insertUserData(firstname, lastname, floor, buildingSpec, aptNumber, buildingId, address, email, hashPassword).then(function(id) {
                        req.session.user = {
                            id:id,
                            firstname:firstname,
                            lastname:lastname,
                            floor:floor,
                            buildingSpec:buildingSpec,
                            buildingId:buildingId,
                            address:address,
                            email: email
                        }
                    res.json({success:true});
                    })
                })
            }
        }).catch(function(err) {
            console.log(err);
        })
    }
    else res.send('Your email is not correct');

})


app.get('/checkAddress', function(req, res) {
    if (req.session.address) {
        res.json({
            success: true,
            file: req.session.address
        });
    } else {
        res.json({success: false});
    }
});

app.get('/getAllDetails', function(req,res) {
    if(req.session) {
        console.log(req.session);
        res.json({
            success:true,
            file: req.session
        })
    }
})

app.get('/getAllUsers', function(req, res) {
    var buildingId = req.session.buildingId;
    db.getUsers(buildingId).then(function(result) {
        res.json({
            success:true,
            file: result.rows
        })
    })
})



app.listen(3000, function() {
    console.log('listening');
});



// Link to={`/chatWithUser/${user.id}`}
