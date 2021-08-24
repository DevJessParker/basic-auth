'use strict';

const Users = require('../models.index.js')

const auth = (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop(); 
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  const user = await Users.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      next();
    } else {
      next("Invalid Login"); 
    }
  }

module.exports = auth;