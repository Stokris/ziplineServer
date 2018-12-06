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
    console.log('hello');
    console.log(typeof req.user.id);
    Log.findAll({
        where: { owner_properties: `${req.user.id}`}
    })
    .then(
        function getAllSuccess(data) {  // assuming we are successful we will return all the data in a json
            res.json(data);
        },
        function getAllError(err) {
            res.send(500, err.message);  // if we don't pull it off we get an error message
        }
        );
    })   
    
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