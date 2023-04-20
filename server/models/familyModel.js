const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configuration/db");

const FamilyMember = sequelize.define("familymembers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    timestamps: false, // disable timestamps
  },
  updatedAt: {
    timestamps: false, // disable timestamps
  },
});

module.exports = FamilyMember;
