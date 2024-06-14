const workingDb = require('../services/workingDB');
const { isEmail } = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signup_get(req, res) {
        res.render('signup');
    },

    login_get(req, res) {
        res.render('login')
    },

    logout_get(req, res) {
        res.cookie('jwt', '', {maxAge: 1});
        res.status(200).send('log out');
        // res.redirect('/login');
        // res.render('login');
    },

    signup_post(req, res) {
        console.log(req.body);
        const errors = findErrors(req.body);
        if (errors.length === 0) {
            bcryptjs.genSalt(10, (err, salt) => {
                if (!err) {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        if (!err) {
                            req.body.password = hash;
                            workingDb
                                .createData('users', req.body)
                                .then(data => {
                                    const token = createToken(data[0]);
                                    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
                                    res.status(201).json({ 'user': data[0] });
                                })
                                .catch(err => {
                                    if (err.errno === 1062) {
                                        res.status(400).json({ errors: { email: "email is already registered" } });
                                    } else {
                                        res.status(400).json({ errors: {password: err.message} });
                                    }
                                });
                        } else {
                            console.log('bcryptjs_hash_error:', err);
                            res.status(400).json({errors: {password: 'bcryptjs_hash_error'}});
                        }
                    })
                } else {
                    console.log('bcryptjs_genSatl_error:', err);
                    res.status(400).json({errors: {password: 'bcrypt_genSalt_error'}});
                }

            })

        } else {
            res.status(400).json({
                errors: errors.reduce((acm, item) => {
                    Object.assign(acm, item);
                    return acm;
                }, {})
            });
        }

    },

    login_post(req, res) {
        const errors = findErrors(req.body);
        if(errors.length === 0) {
            workingDb
                .getByField('users', { email: req.body.email })
                .then(users => {
                    console.log(users);
                    if (users.length >= 0) {
                        bcryptjs.compare(req.body.password, users[0].password)
                            .then(auth => {
                                if (auth) {
                                    const token = createToken(users[0].id);
                                    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
                                    res.status(200).json({ 'user': users[0].id });
                                } else {
                                    res.status(400).json({ errors: { password: 'email or password is incorrect' } });
                                }
                            });
                    } else {
                        res.status(400).json({ errors: { password: 'email or password is incorrect' } });
                    }
                })
                .catch(err => {
                    res.status(400).json({ errors: { password: err.message } });
                });
        } else {
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