const express = require("express");
require("./database/Connect");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/", require("./Routes/Auth"));
app.use("/", require("./Routes/Notes"));

app.use(express.json());

app.listen(4500);
