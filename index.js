const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.get('/', async (req, res) => {
    res.send('Laptop BD Bazar Server running!')
})

app.listen(port, () =>
    console.log(`Laptop BD Bazar running on ${port}!`
    ))