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
    console.log(req.session.address);
    db.checkBuilding(placeId).then(function(result) {
        console.log(result.rows);
        if(result.rows.length>0) {
            res.json({success:true});
        }
        else {
            res.json({success:false});
        }
    })
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

app.get('/registerBuilding', function(req,res) {
    var address = req.session.address;
    var placeId = req.session.placeId;
    db.insertBuilding(address,placeId).then(function(result) {
        res.json({success:true, file:address});
    })
})


app.listen(3000, function() {
    console.log('listening');
});
