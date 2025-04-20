const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://raghavendrakv23:Raghavendra23@cluster0.qj6ks.mongodb.net/fencing_club"
);

//schemas
const studentsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  points: Number,
  status: String,
  group: String,
});

const historySchema = new mongoose.Schema({
  id: Number,
  name: String,
  points: Number,
  status: String,
  pool: String,
  group: String,
  dateTime: String,
  change: String,
});

//model
const Students = mongoose.model("students", studentsSchema, "students");

const History = mongoose.model("history", historySchema, "history");

module.exports = {
  Students,
  History,
};
