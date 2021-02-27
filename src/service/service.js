"use strict";
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://envision-user:utDqZf9yWIFW87Ej@envision-cluster.pgpms.mongodb.net/envision-db?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function getDataByDirectAndTime(direction, timestamp) {
  let weekdaysArray = 0;
  let weekendArray = 0;
  let result = {};
  try {
    // Connect the client to the server
    await client.connect();
    // Establish connection
    const database = client.db("envision-db");
    const collection = database.collection("sample-data");
    // query data
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    await collection.find({ direction: direction }).forEach((data) => {
      const date = new Date(data.timestamp);
      const dayName = weekDays[date.getDay()];
      if (timestamp === "weekdays" && dayName !== null) {
        weekdaysArray++;
      } else if (timestamp === "weekend" && dayName === null) {
        weekendArray++;
      }
    });
    // save result
    result = {
      weekdays: weekdaysArray,
      weekend: weekendArray,
      direction: direction,
      timestamp: timestamp,
    };
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function getAllData() {
  let allResult = [];
  try {
    // Connect the client to the server
    await client.connect();
    // Establish connection
    const database = client.db("envision-db");
    const collection = database.collection("sample-data");
    // query data
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    await collection.find().forEach((data) => {
      allResult.push(data);
    });
    // save allResult
    return allResult;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getDataByDirectAndTime,
  getAllData,
};
