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
})

router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        const resp = habit.update();
        res.status(200).json(resp);
    } catch (err) {
        res.status(404).send({ err })
    }
})

router.delete("/:id", verifyToken, async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      await habit.destroy();
      res.status(204).json("Habit deleted!");
    } catch (err) {
      res.status(500).json({ err });
    }
  });



module.exports = router