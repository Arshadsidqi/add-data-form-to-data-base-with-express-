// 1 step import express
let express = require("express");
let App = express();
// 2 step use the middle ware
App.use(express.urlencoded({ extended: true }));
// 3 step
let fs = require("fs");

// 4 step  import mongodb

let mongodb = require("mongodb").MongoClient;

// 5 step create database

let conectDB = async () => {
  let client = await mongodb.connect("mongodb://localhost:27017");
  let database = client.db("formdata");
  let collection = database.createCollection("userinformation");
  return collection;
};

// 6 step routing get post
App.get("/", (req, res) => {
  res.send("this is home page ");
});
App.get("/form", (req, res) => {
  fs.createReadStream("./form.html", "utf-8").pipe(res);
});
App.post("/form",async (req, res) => {
   let payload= req.body;
   let collection=await conectDB();
   await collection.insertOne(payload)
  });
App.listen(9000, (err) => {
  if (err) throw err;
  console.log(`server running at port http://localhost:9000`);
});
