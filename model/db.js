const Sequelize = require("sequelize");
const con = new Sequelize("GamesRest", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = con;
