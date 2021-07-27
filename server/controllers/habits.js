const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Habit = require('../models/Habit');
const User = require('../models/User');

/**
 * CRUD operation.
 * Create: A habit is created for a particular user.
 * Read: An array of habits is read in.
 * Update: Streaks are patched in.
 * Delete: A habit is deleted.
 */
// Read
router.get('/:email', verifyToken, async (req, res) => {
	try {
		const habits = await Habit.filterByEmail(req.params.email);
		res.status(200).json(habits); // Sending an array of habbits for this user
	} catch (err) {
		res.status(500).send({ err });
	}
});

// Create
router.post('/', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.create({ ...req.body, email: req.email });
		res.status(201).json(habit); // Creating habits associated with the user
	} catch (err) {
		res.status(500).send({ err });
	}
});

// Update
router.patch('/:id', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		const resp = await habit.update();
		res.status(200).json(resp);
	} catch (err) {
		res.status(404).send({ err });
	}
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		await habit.destroy();
		res.status(204).json('Habit deleted!');
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
