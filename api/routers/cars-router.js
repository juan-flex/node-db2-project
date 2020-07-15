const express = require('express')
const router = express.Router();

const db = require('../../data/dbConfig');

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars').where({ id })
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})

router.post('/', (req, res) => {
    const newCar = req.body;
    db('cars').insert(newCar)
        .then(car => {
            res.status(201).json(car);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})
router.put('/:id', (req, res) => {
    const updatedCar = req.body;
    const { id } = req.params;

    db('cars').where({ id }).update(updatedCar)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).del()
        .then(deleted => {
            if(deleted === 0){
                res.status(400).json({ 
                    error: true, 
                    message: 'Car not found'
                })
            }else{
                res.status(200).json(data);
            }        
        })
        .catch(err => {
            res.status(500).json(err);
        })

        
})

module.exports = router;