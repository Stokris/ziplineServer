var express = require('express');
var router = express.Router();
var Sequelize = require('../db');
var User = Sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24})

            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.status(500).send(err)
    )
});

module.exports = router;