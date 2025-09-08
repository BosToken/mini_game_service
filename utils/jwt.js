const jwt = require("jsonwebtoken");

module.exports = {
  sign: (data) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' }),
  verify: (token) => jwt.verify(token, process.env.JWT_SECRET),
  decode: (token) => jwt.decode(token),
};