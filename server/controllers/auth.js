require('dotenv').config();
const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/User');


/**
 * Upon registration, the password is hashed and a new User is created.
 */
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password:hashed});
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json(err);
    }
})

/**
 * Upon login, the database is checked for the e-mail.
 * A token is generated if the password is correct.
 */

router.patch('/password/:email', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = await User.findByEmail(req.params.email);
        const matched = user.passwordDigest === req.body.password;
        if (!!matched) {
        await user.updatePassword(hashed);
        res.status(201).json({msg: 'Password successfully changed'});
        } else {
            throw new Error ("Passwords don't match")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email);
        if (!user) {
            throw new Error('No user with this email')
        };
        const authed = bcrypt.compare(req.body.password, user.passwordDigest);
        if (!!authed) {
            const payload = {email: user.email, name: user.name };
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 60 }, sendToken);
        } else {
            throw new Error ('User could not be authenticated')
        }
     } catch (err) {
            res.status(401).json({err});
    }
})

module.exports = router