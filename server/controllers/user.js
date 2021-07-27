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
		const resp = await user.updateDetails(req.body.name, req.body.email);
		res.status(200).json(resp);
	} catch (err) {
		res.status(404).send({ err });
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
