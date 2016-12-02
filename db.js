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


exports.checkEmail = function(email) {
    return getFromDb('SELECT * FROM users WHERE email=$1',[email]).then(function(result) {
        return result;
    });
};

exports.insertUserData = function(firstname, lastname, floor, buildingSpec, aptNumber, buildingId, address, email, hashPassword) {
    return getFromDb('INSERT into users(firstname, lastname, floor, building_specifications, apt_number,building_id, address, email, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',[firstname, lastname, floor, buildingSpec, aptNumber, buildingId, address, email, hashPassword]).then(function(result) {
        console.log(result.rows);
        return result.rows[0].id;
        res.json({success:true});
    }).catch(function(err) {
        console.log(err);
    });
};

exports.getUsers = function(buildingId) {
    return getFromDb('SELECT * FROM users WHERE building_id=$1',[buildingId]).then(function(result) {
        return result;
    });
}

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

exports.hashPassword = function (password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    reject(err);
                }
                else  {
                    resolve(hash);
                }
            });
        });
    });
};

exports.checkPassword = function (requestedPassword, listedPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(requestedPassword, listedPassword, function(err, doesMatch) {
            if (err) {
                reject(err);
            }
            else {
                console.log(doesMatch);
                resolve(doesMatch);
            }
        });
    });
};
