var pg = require('pg');
if(!process.env.DATABASE_URL) {
    var password = require('./password.json');
}
var dbUrl = process.env.DATABASE_URL || `postgres://${password.user}:${password.password}@localhost:5432/neighbours`;

dbUrl = require('url').parse(dbUrl);
var bcrypt = require('bcrypt');
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
        return result.rows[0].id;
        res.json({success:true});
    }).catch(function(err) {
        console.log(err);
    });
};

exports.getUsers = function(buildingId,currentUser) {
    return getFromDb('SELECT * FROM users WHERE building_id=$1 AND id!=$2',[buildingId, currentUser]).then(function(result) {
        return result;
    });
};

exports.getGeneralMessages = function(buildingId) {
    return getFromDb('SELECT * FROM generalMessages WHERE building_id=$1 ORDER BY created_at LIMIT 200',[buildingId]).then(function(result) {
        return result;
    }).catch(function(err) {
        if(err) {
            console.log(err);
        }
    });
};

exports.getPrivateMessages = function(whichChat) {
    return getFromDb('SELECT * FROM privateMessages WHERE chat_name=$1 ORDER BY created_at LIMIT 200',[whichChat]).then(function(result) {
        return result;
    }).catch(function(err) {
        if(err) {
            console.log(err);
        }
    });
};



exports.insertGeneralMessage = function(user_id, firstname, lastname, buildingId, message) {
    return getFromDb('INSERT into generalMessages(user_id, firstname, lastname, building_id, message) VALUES($1,$2,$3,$4,$5) RETURNING id,message, firstname, lastname, user_id, created_at', [user_id, firstname, lastname, buildingId, message]).then(function(result) {
        return result;
    }).catch(function(err) {
        if(err) {
            console.log(err);
        }
    });
};

exports.insertPrivateMessage = function(whichChat, message, user_id, firstname, lastname, buildingId) {
    return getFromDb('INSERT into privateMessages(chat_name, message, user_id, firstname, lastname, building_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,chat_name, message, firstname, lastname, user_id, created_at', [whichChat, message, user_id, firstname, lastname, buildingId]).then(function(result) {
        return result;
    }).catch(function(err) {
        if(err) {
            console.log(err);
        }
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
