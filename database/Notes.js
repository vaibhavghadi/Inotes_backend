const { type } = require("@testing-library/user-event/dist/type");
const mongo = require("mongoose");

const schema = mongo.Schema({
  user: {
    type: mongo.Schema.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "general",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongo.model("note", schema);
