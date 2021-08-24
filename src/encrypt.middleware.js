'use strict';

const encrypt = (req, res, next) => {
  try {
    req.body.password = bcrypt.hash(req.body.password, 5);
    next();
  } catch {
    console.log('didnt work')
    next('didnt work');
  }
}

module.exports = encrypt;