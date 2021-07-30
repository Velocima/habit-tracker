const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/**
 * Routes specified for authentication, habits, and users.
 */
const authRoutes = require('./controllers/auth');
const userRoutes = require('./controllers/user');
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

module.exports = app;
