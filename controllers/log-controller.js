var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var validateSession = require('../middleware/validate-session');
var Log = sequelize.import('../models/log');

router.post('/', validateSession, (req, res) => {
    if(!req.error){
        let parks = req.body.log.parks;
        let time = req.body.log.time;
        let people = req.body.log.people;
        let price = req.body.log.price;
        let owner = req.user.id;

        Log
        .create({
            parks: parks,
            time: time,
            people: people,
            price: price,
            owner_properties: owner,
        })
        .then(function(log){
            res.send(log);
        },
        function(err) {
            console.log(err);
        }
    )}
});

router.get('/', (req, res) => {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(error => res.status(500).json(error))
});

router.get('/:id', (req, res) => {
    Log.findOne({ where: { id: req.params.id }})
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json(error))
})

router.put('/:id', (req, res) => {
    if(!req.errors) {
        Log.update({price: req.body.log.price, time: req.body.log.time, people: req.body.log.people, price: req.body.log.price}, {where: {id: req.params.id}})
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json(req.errors))
    } else {
        res.status(500).json(req.error)
    }
})

router.delete('/:id', (req, res) => {
    if(!req.errors) {
        Log.destroy( { where: {id: req.params.id }})
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json(req.errors))
    } else {
        res.status(500).json(req.error)
    }
})

module.exports = router;