const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
    const user = await User.all
    res.json(user)
})

module.exports = router