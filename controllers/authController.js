const db = require('../services/db');
const { isEmail } = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    // signup_get(req, res) {
    //     res.render('signup');
    // },

    // login_get(req, res) {
    //     res.render('login')
    // },

    logout_get(req, res) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).send('log out');
        // res.redirect('/login');
        // res.render('login');
    },

    async signup_post(req, res) {
        console.log(req.body);
        const errors = findErrors(req.body);
        if (errors.length === 0) {
            try {
                const salt = await bcryptjs.genSalt(10);
                const hash = await bcryptjs.hash(req.body.password, salt);
                req.body.password = hash;
                const [userId] = await db.createData('users', req.body);
                const token = createToken(userId);
                res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
                res.status(201).json({ 'user': userId });
            } catch (err) {
                if (err.errno === 1062) {
                    res.status(400).json({ errors: { email: "email is already registered" } });
                } else {
                    res.status(400).json({ errors: { password: err.message } });
                }
            }
        } else {
            res.status(400).json({
                errors: errors.reduce((acm, item) => {
                    Object.assign(acm, item);
                    return acm;
                }, {})
            });
        }
    },

    async login_post(req, res) {
        const errors = findErrors(req.body);
        if (errors.length === 0) {
            try {
                const [user] = await db.getByField('users', { email: req.body.email });
                if (user) {
                    console.log(user);
                    const auth = await bcryptjs.compare(req.body.password, user.password);
                    if (auth) {
                        const token = createToken(user.id);
                        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
                        res.status(200).json({ 'user': user.id });
                    }
                    else {
                        res.status(400).json({ errors: { password: 'email or password is incorrect' } });
                    }
                }
                else {
                    res.status(400).json({ errors: { password: 'email or password is incorrect' } });
                }
            } catch (err) {
                res.status(400).json({ errors: { password: err.message } });
            }
        }
        else {
            res.status(400).json({
                errors: errors.reduce((acm, item) => {
                    Object.assign(acm, item);
                    return acm;
                }, {})
            });
        }
    }
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
    return jwt.sign({ id }, 'jwt secret', {
        expiresIn: maxAge
    })
}
function findErrors(obj) {
    const errors = [];
    if (!isEmail(obj.email)) {
        errors.push({ email: 'email is not valit' });
    }
    if (obj.password.length < 6) {
        errors.push({ password: "password length mast min 6 charakter" });
    }
    return errors;
}