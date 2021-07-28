const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Habit = require('../models/Habit');
const User = require('../models/User');

/**
 * CRUD operation.
 * Create: A habit is created for a particular user.
 * Read: An array of habits is read in.
 * Update: Completion dates are updated.
 * Delete: A habit is deleted and a completion date is deleted if user has unticked it
 */
// Read
router.get('/', verifyToken, async (req, res) => {
	try {
		const habits = await Habit.filterByEmail(req.email);
		res.status(200).json(habits); // Sending an array of habbits for this user
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.get('/:id', verifyToken, async (req, res) => {
	try {
		const { id } = req.params;
		const habit = await Habit.findById(id);
		res.status(200).send({ habit });
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

		// Converting unix datestamps into strings because we only want the dates:
		const dateStrings = habit.completionDates.map((date) => date.toLocaleString());

		// Checking for duplicate dates:
		if (dateStrings.indexOf(today) === -1) {
			const resp = await habit.update();
			res.status(200).json(resp);
		} else {
			const resp = 'You cannot double-complete a habit';
			res.status(404).json(resp);
		}
	} catch (err) {
		res.status(404).send({ err });
	}
});

// Delete a habit
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		await habit.destroy();
		res.status(204).json();
	} catch (err) {
		res.status(500).json({ err });
	}
});

// Delete a completion date (if user made a mistake)
router.delete('/completions/:id', verifyToken, async (req, res) => {
	try {
		await Habit.destroyCompletionDate(req.params.id);
		res.status(204).json();
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
