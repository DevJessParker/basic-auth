'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

app.use(express.urlencoded({ extended: true }));

function start(port) {
  sequelize.sync()
    .then(() => {
    app.listen(port, () => {
      console.log(`server proof of life: ${port}`)
    }) .catch(e => {
      console.error('Could not start server', e.message)
    })
  })
}

module.exports = {
  app: app,
  start: start
}
