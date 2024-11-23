var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var db = require("./database/db.js");

db();
console.log("database connected");

var Schema = mongoose.Schema;

var tvSchema = new Schema({
  id: String,
  modelName: String,
  brand: String,
  price: Number,
  size: Number,
});

var tvModel = mongoose.model("tv", tvSchema);

var app = express();
app.use(cors());
app.use(express.json());

app.get("/gettv", async (request, response) => {
  try {
    var result = await tvModel.find();
    response.send(result);
  } catch (err) {
    response.send(err.message);
  }
});

app.post("/addtv", async (request, response) => {
  try {
    var result = tvModel(request.body);
    var ans = await result.save();
    response.send("data inserted");
  } catch (err) {
    response.send(err.message);
  }
});

app.put("/update/:id", async (request, response) => {
  try {
    await tvModel.updateOne({ id: request.params.id }, { $set: request.body });
    response.send(request.params.id + "Updated ");
  } catch (err) {
    response.send(err.message);
  }
});

app.delete("/delete/:id", async (request, response) => {
  try {
    await tvModel.deleteOne({ id: request.params.id });
    response.send(request.params.id + "deleted");
  } catch (err) {
    response.send(err.message);
  }
});
app.listen(9111);
