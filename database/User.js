const mongo = require("mongoose");

const schema = mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongo.model("user", schema);
