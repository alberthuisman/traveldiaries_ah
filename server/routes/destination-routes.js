//IMPORTS
const express = require('express');
const router = express.Router();
const Travels = require('../dbHelpers');

//GET ALL DESTINATIONS
router.get('/destinations', (req,res)=>{
    Travels.getAllDestinations()
    .then(destination => {
        res.status(200).json(destination)
    })
    .catch(error => res.status(500).json(error))
})

//ADD DESTINATION POSTED BY USER
router.post('/users/:id/destinations', (req, res) => {
    const id = req.params.id;
    const newDestination = req.body;
    newDestination["user_id"] = id;
    Travels.findUserById(id)
    .then(user=> {
        if(!user) {
            res.status(404).json({message:"user does not exist"})
        } else {
            if(!newDestination.title || !newDestination.description) {
                res.status(400).json({message:"all fields must be completed"})
            } else {
                Travels.addDestination(newDestination)
                .then(destination => {
                    res.status(200).json(destination)
                })
                .catch(error => res.status(500).json(error))
            }
        }
    })
    .catch(error => res.status(500).json(error))
})

//DELETE DESTINATION
router.delete('/destinations/:id', (req, res)=> {
    const {id} = req.params;
    Travels.removeDestination(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: 'Destination is deleted'})
        } else {
            res.status(404).json({message: 'No destination with that id'})
        }
    })
    .catch(error => res.status(500).json(error))
})

//UPDATE DESTINATION
router.patch('/destinations/:id', (req,res)=> {
    const{id} = req.params;
    Travels.updateDestination(id, req.body)
    .then(destination => {
        res.status(200).json({message: "Destination updated"})
    })
    .catch(error => res.status(500).json(error))
})

//GET NUMBER OF USERS FOR A DESTINATION
router.get('/destinationNumbers', (req,res) => {
    Travels.groupDestinations()
    .then(destination => {
        res.status(200).json(destination)
    })
    .catch(error => res.status(500).json(error))
})

module.exports = router;