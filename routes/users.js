'use strict';

const express = require('express');
const { Users } = require('../models/index.js');

const userRoutes = express.Router;

userRoutes.post('/user', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password
  Users.create({ userName, password })
})

userRoutes.get('/user', (req, res) => {
  let userName = req.header.userName;
  let password = req.body.password;
  Users.read({ userName, password })
})

userRoutes.put('/user', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password
  Users.update({ userName, password })
})

userRoutes.delete('/user', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password
  Users.delete({ userName, password })
})


module.exports = userRoutes;