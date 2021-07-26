const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Habit = require('../models/Habit');
const User = require('../models/User');

router.get('/:email', verifyToken, async (req, res) => {
    try {
        const habits = await Habit.filterByEmail(req.params.email)
        res.status(200).json(habits) // Sending an array of habbits for this user
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.post('/', verifyToken, async (req, res) => {
    try {
        const habit = await Habit.create(req.body)
        res.status(201).json(habit) // Creating habits associated with the user
    } catch (err) {
        res.status(500).send({ err })
    }
}
)
module.exports = router