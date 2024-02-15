const mongo = require("mongoose");
const url = "mongodb://localhost:27017/inotes";

module.exports = mongo.connect(url);
