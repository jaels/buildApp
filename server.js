var express = require('express'),
app = express(),
cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session'),
http = require('http').Server(app),

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

var io = require('socket.io')(http);

var connected={};

var users={};
var sockett;

io.sockets.on('connection', function(socket){
    // socket.emit('connection');

    socket.on('send:message', function(message){
        io.emit('send:message', message);
    });
    socket.on("send:private", function(message){
        io.emit('toNav', message);
        console.log('recievePrivate');
                console.log('yessss')
                var sockett=users[message.otherUser];
                if(sockett) {
                    sockett.emit("send:private", message)
                }
    });
    socket.on('newUser', function(user) {
        console.log('user conncted' + user.id)
        console.log('pushing user');
        users[user.id] = socket;
        connected[user.id.toString()] = true;
        console.log('conncted new user')
        console.log(connected);
        io.emit('hey', connected);
    })

    socket.on('bye', function(user) {
        console.log('user disconnected ' + user);
        connected[user.toString()] = false;
        console.log('after user left')
        console.log(connected);
        io.emit('bye', connected);
        // connected[user.id]=false;
    })
});


app.get('/whosConnected', function(req,res) {
    console.log('whos connected');
    console.log(connected);
    res.json({file:connected})
})

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

var users = [];

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

                    res.json({success: true,
                    file:req.session});


                }

                else {
                    res.json({success: false});
                }
            })

        }
    })
})

app.post('/registerUser', function(req, res) {
    console.log('registeringgg');
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
                        res.json({success:true,
                        file:req.session});
                    })
                })
            }
            else {
                res.json({success:false})
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
    if(req.session.user) {
        res.json({
            success:true,
            file: req.session
        })
    }
    else {
        res.json({
            success:false
        })
    }
})

app.get('/getAllUsers', function(req, res) {
    var buildingId = req.session.buildingId;
    var currentUser = req.session.user.id;
    db.getUsers(buildingId,currentUser).then(function(result) {
        res.json({
            success:true,
            file: result.rows
        })
    })
})

app.get('/getGeneralMessages/:buildingId', function(req,res) {
    var buildingId=req.params.buildingId;
    db.getGeneralMessages(buildingId).then(function(result){
        res.json({
            success:true,
            file:result.rows
        })
    })

})

app.get('/getPrivateMessages/:whichChat', function(req,res) {

    var whichChat=req.params.whichChat;
    req.session.whichChat = whichChat;
    var temp = whichChat.split("_")
    if(temp[0]==req.session.user.id || temp[1]==req.session.user.id) {


    db.getPrivateMessages(whichChat).then(function(result){        res.json({
            success:true,
            file:result.rows
        })
    })
    }
})


app.post('/insertGeneralMessage', function(req,res) {

    var message = req.body.newMessage;
    var buildingId = req.session.buildingId;
    var firstname = req.session.user.firstname;
    var lastname = req.session.user.lastname;
    var user_id = req.session.user.id;
    db.insertGeneralMessage(user_id, firstname, lastname, buildingId, message).then(function(result) {
        res.json({success: true, file: result.rows[0]});
    })

})

app.post('/insertPrivateMessage', function(req,res) {
    var message = req.body.newMessage;
    var whichChat = req.body.whichChat;
    var user_id = req.session.user.id;
    var firstname = req.session.user.firstname;
    var lastname = req.session.user.lastname;
    var buildingId = req.session.buildingId;
    db.insertPrivateMessage(whichChat, message, user_id, firstname, lastname, buildingId).then(function(result) {
        res.json({success: true, file: result.rows[0]});
    })

})


app.get('/logout', function(req, res) {
    req.session = null;
    console.log('logging out')
    res.json({success: true});
});

 http.listen(process.env.PORT || 3000);




// Link to={`/chatWithUser/${user.id}`}
