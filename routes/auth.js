const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const key = require('../.secret/key');


const auth = express.Router();


auth.post('/login', function (req, res) {
    let email = req.body.email;
    let pwd = req.body.pwd;
    console.log(email);
    console.log(pwd);

    User.findOne({ email: email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "Invalid Credentials00!" });
            } else {
                //Crypto stuff here...
                bcrypt.compare(pwd, user.pwd, function (err, resp) {
                    if (resp === true) {

                        jwt.sign({ user }, key, { expiresIn: '12h' }, function (err, token) {
                            if (err) throw err;
                            else{
                                 res.json({
                                    token: token,
                                    user: {
                                            "name": user.name,
                                            "lastName": user.lastName,
                                            "email": user.email,
                                        }
                                }); 
                            }
                        });
                    } else {
                        res.status(401).json({ message: "Invalid Credentials!" });
                    }
                });
            }
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});


//Verify Token: (Generate a kyepair with ECC)
//Format of TOKEN: Bearer <access_token>
const verifyToken = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        console.log('INVALID TOKEN!!!');
        res.status(403).json({
                message: 'INVALID TOKEN!!!',
            });
    }
}

module.exports = { authRoutes: auth, verifyToken: verifyToken };