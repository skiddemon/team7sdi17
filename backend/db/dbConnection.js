const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

module.exports = knex;