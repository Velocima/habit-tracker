const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Habit = require('../models/Habit');

router.get('/', verifyToken, async (req, res) => {
    try {
        const habits = await Habit.all
        res.json(habits)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router