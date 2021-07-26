const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors('*'));
app.use(express.json());

const authRoutes = require('./controllers/auth');
const habitsRoutes = require('./controllers/habits');
const userRoutes = require('./controllers/user');
app.use('/auth', authRoutes);
app.use('/habits', habitsRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

module.exports = app;