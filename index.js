const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Students, History } = require("./database");

const app = express();

app.use(
  cors({
    origin: "https://fencing-prod.vercel.app",
  })
);
app.use(bodyParser.json());

app.get("/student/:group", async function (req, res) {
  try {
    const group = req.params.group;
    let students = [];
    if (group == "All") {
      students = await Students.find({});
    } else {
      students = await Students.find({ "group": group });
    }
    res.status(200).json({
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      data: err,
    });
  }
});

app.put("/student/:id", async function (req, res) {
  try {
    const studentId = req.params.id;
    const data = req.body;
    await Students.updateOne({ id: studentId }, { $set: data });
    res.status(200).json({
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      data: err,
    });
  }
});

app.post("/history", async function (req, res) {
  try {
    const data = req.body;
    const newRecord = new History(data);
    newRecord.save();
    res.status(200).json({
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
    });
  }
});

app.get("/history/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const students = await History.find({ "id": id });
    res.status(200).json({
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      data: err,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
