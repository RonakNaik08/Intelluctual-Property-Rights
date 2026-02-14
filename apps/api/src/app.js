const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req,res)=> res.send("IPR API Running"));

module.exports = app;
