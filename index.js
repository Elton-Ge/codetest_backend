"use strict";

const express = require("express");
const { getLocation, getAll } = require("./src/controller/controller");
const app = express();

app.get("/getLocation", getLocation);

app.get("/getAll", getAll);


app.listen(5000, () => {
  console.log("server is run on port 5000");
});
