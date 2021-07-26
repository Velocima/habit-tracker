const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const { findByEmail } = require('../models/user');

const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
    try {
    const user = await User.all
    res.json(user)
    } catch (err) {
        res.status(500).send({err});
    }
})

router.get('/:email', verifyToken, async (req, res) => {
    try {
    const user = await User.findByEmail(req.params.email)
    res.json(user)
    } catch (err) {
        res.status(404).send({err});
    }
})




module.exports = router