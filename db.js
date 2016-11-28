var pg = require('pg');
if(!process.env.DATABASE_URL) {
    var password = require('./password.json');
}
var dbUrl = process.env.DATABASE_URL || `postgres://${password.user}:${password.password}@localhost:5432/neighbours`;


var bcrypt = require('bcrypt');

dbUrl = require('url').parse(dbUrl);

var dbUser = dbUrl.auth.split(':');

var dbConfig = {
    user: dbUser[0],
    database: dbUrl.pathname.slice(1),
    password: dbUser[1],
    host: dbUrl.hostname,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(dbConfig);

pool.on('error', function(err) {
    console.log(err);
});


exports.checkBuilding = function(placeId){
    return getFromDb('SELECT * FROM buildings WHERE placeId=$1',[placeId]).then(function(result) {
        return result;
    }).catch(function(err) {
        console.log(err);
    });
};


exports.insertBuilding = function(address,placeId) {
    return getFromDb('INSERT into buildings(address,placeId) VALUES($1,$2) RETURNING id', [address,placeId]).then(function(result) {
        return result;
    }).catch(function(err) {
        console.log(err);
    });
};




function getFromDb(str, params) {
    return new Promise(function(resolve, reject) {
        pool.connect(function(err, client, done) {
            if (err) {
                reject(err);
                return;
            }
            client.query(str, params || [], function(err, result) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
                done();
            });
        });
    });
}
