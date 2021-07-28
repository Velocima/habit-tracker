const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const { findByEmail } = require('../models/user');

const User = require('../models/user');

router.get('/:email', verifyToken, async (req, res) => {
	try {
		const user = await User.findByEmail(req.params.email);
		res.json(user);
	} catch (err) {
		res.status(500).send({ err });
	}
});

router.patch('/:email', verifyToken, async (req, res) => {
	try {
		const user = await User.findByEmail(req.params.email);
		if (user.name === req.body.name) {
			throw new Error('Must provide a different name to current in order to update');
		}
		const resp = await user.updateName(req.params.email, req.body.name);
		res.status(200).json(resp);
	} catch (err) {
		if (err.message === 'Must provide a different name to current in order to update') {
			res.status(400).send({ err: err.message });
		} else {
			res.status(404).send({ err: err.message });
		}
	}
});

router.use('/:email', (req, res, next) => {
	const { email } = req.params;
	req.email = email;
	next();
});

const habitsRouter = require('./habits');
router.use('/:email/habits', habitsRouter);

module.exports = router;
