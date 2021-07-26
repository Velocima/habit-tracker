const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors('*'));
app.use(express.json());

const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));

module.exports = app;