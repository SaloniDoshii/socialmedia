/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcryptjs");
module.exports = {
  attributes: {
    id: {
      type: "string",
      required: true,
      columnType: "varchar(40)",
    },

    email: {
      type: "string",
      required: true,
      unique: true,
    },

    password: {
      type: "string",
      required: true,
    },

    token: {
      type: "string",
      allowNull: true,
      columnType: "varchar(255)",
    },
  },

  beforeCreate: (value, next) => {
    bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        throw new Error(err);
      }
      value.password = hash;
      next();
    });
  },
};
