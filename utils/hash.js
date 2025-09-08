require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  hash: (data) => bcrypt.hash(data, Number(process.env.SALT_ROUND) || 10),
  compare: (data, hash) => bcrypt.compare(data, hash),
};
