const Sequelize = require("sequelize");
const con = require("./db");
const Games = con.define("Games", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Games.sync({ force: false });

module.exports = Games;
