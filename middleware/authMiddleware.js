const jwt = require('jsonwebtoken');
const workingDb = require('../services/db');

module.exports = {
    async requireToken(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decodedToken = await jwt.verify(token, 'jwt secret');
                console.log(decodedToken);
                next();
            } catch (err) {
                console.log(err.message);
                // res.redirect('/login');
                res.send('tizimda ro\'yxatdan o\'t');
            }
        }
        else {
            // res.redirect('/login');
            res.send('tizimda ro\'yxatdan o\'t');
        }
    },

    async checkUser(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decodedToken = await jwt.verify(token, 'jwt secret');
                console.log(decodedToken);
                const [user] = await workingDb.getById('user', decodedToken.id);
                res.locals.user = user;
                next();
            } catch (err) {
                console.log('checkToken_err: ', err);
                res.locals.user = null;
                next();
            }
        }
        else {
            res.locals.user = null;
            next();
        }
    }
}