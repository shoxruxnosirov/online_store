const jwt = require('jsonwebtoken');
const workingDb = require('../services/workingDB');

module.exports = {
    requireToken(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'jwt secret', (err, decodedToken) => {
                if (!err) {
                    console.log(decodedToken);
                    next();
                }
                else {
                    console.log(err.message);
                    // res.redirect('/login');
                    res.send('tizimda ro\'yxatdan o\'t');
                }
            })
        }
        else {
            // res.redirect('/login');
            res.send('tizimda ro\'yxatdan o\'t');
        }
    },

    checkUser(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'jwt secret', (err, decodedToken) => {
                if (!err) {
                    console.log(decodedToken);
                    workingDb.getById('user', decodedToken.id)
                        .then(users => {
                            res.locals.user = users[0];
                            next();
                        })
                        .catch(err => {
                            console.log('checkToken_err: ', err);
                            res.locals.user = null;
                            next();
                        });

                }
                else {
                    console.log('checkToken_err: ', err);
                    res.locals.user = null;
                    next();
                }
            })
        }
        else {
            res.locals.user = null;
            next();
        }
    }
}