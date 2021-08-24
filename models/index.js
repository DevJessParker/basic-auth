'use strict';

const POSTGRES_URI = process.env.POSTGRES_URI;
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('../lib/collection.js');
const userSchema = require('./user.model.js');

let sequelize = process.env.NODE_ENV === 'test' ? new Sequelize('sqlite:memory') : new Sequelize(POSTGRES_URI);

const userModel = userSchema(sequelize, DataTypes);

const userCollection = new Collection(userModel);

module.exports = {
  db: sequelize,
  Users: userCollection
}