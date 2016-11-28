var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    csrf = require('csurf'),
    csrfProtection = csrf({cookie: true}),
    bodyParser = require('body-parser'),
     db = require('./db');


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(cookieSession({
    secret: 'secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(csrfProtection);
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return next();
});


app.listen(3000, function() {
    console.log('listening');
});

app.post('/trial', function(req,res) {
    var address = req.body.address;
    var placeId = req.body.placeId;
    db.checkBuilding(placeId).then(function(result) {
        console.log(result.rows);
        if(result.rows.length>0) {
            res.json({success:true});
        }
    })
    // db.insertBuilding(address,placeId).then(function(result) {
    //     console.log(result);
    //     res.json({success:true});
    // })
    // res.json({success: true, file: [1,2,3]});
})
