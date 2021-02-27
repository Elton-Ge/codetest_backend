"use strict";

const express = require("express");
const {count,getAll}= require("./service/getData");
const app = express();

app.get("/getLocation", async (req, resp) => {
  const { direction, timestamp } = req.query;
  const result = await count(direction, timestamp);
  resp.json(result);
});

app.get("/getAll", async (req,resp) => {
  const allResult= await getAll();
  resp.json(allResult);
} );

app.listen(5000, () => {
  console.log("server is run on port 5000");
});
