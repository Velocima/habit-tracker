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

// Delete a habit
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		await habit.destroyHabit();
		res.status(204).json();
	} catch (err) {
		if (err.message === 'Habit not found') {
			res.status(404).json({ err: err.message });
		} else {
			res.status(500).send();
		}
	}
});

router.get('/:id/complete', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		const resp = await habit.isComplete;
		res.status(200).json({ ...habit, isComplete: resp });
	} catch (err) {
		res.status(404).send({ err: err.message });
	}
});

// Update
router.post('/:id/complete', verifyToken, async (req, res) => {
	try {
		const habit = await Habit.findById(req.params.id);
		const resp = await habit.markAsComplete();
		res.status(200).json(resp);
	} catch (err) {
		res.status(404).send({ err: err.message });
	}
});

// Delete a completion date (if user made a mistake)
router.delete('/:id/complete/:completionId', verifyToken, async (req, res) => {
	try {
		await Habit.destroyCompletionDate(req.params.completionId);
		res.status(204).json();
	} catch (err) {
		res.status(404).json({ err: err.message });
	}
});

module.exports = router;
