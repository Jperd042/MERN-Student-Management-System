const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 
const Student = require("./models/Student");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));
 
// READ
app.get("/students", async (req, res) => {
try {
const students = await Student.find();
 
res.json(students);
 
} catch (error) {
res.status(500).json({
message: error.message,
});
}
});
 
// CREATE
app.post("/students", async (req, res) => {
try {
const { name, course, age } = req.body;
 
if (!name || !course || age === undefined || age === "") {
  return res.status(400).json({
    message: "Please provide name, course, and age.",
  });
}
 
const student = new Student({
  name,
  course,
  age: Number(age),
});
 
await student.save();
 
res.status(201).json(student);
 
} catch (error) {
res.status(500).json({
message: error.message,
});
}
});
 
// UPDATE
app.put("/students/:id", async (req, res) => {
try {
const { name, course, age } = req.body;
 
const updatedStudent = await Student.findByIdAndUpdate(
  req.params.id,
  {
    name,
    course,
    age: Number(age),
  },
  {
    new: true,
    runValidators: true,
  }
);
 
if (!updatedStudent) {
  return res.status(404).json({
    message: "Student not found.",
  });
}
 
res.json(updatedStudent);
 
} catch (error) {
res.status(500).json({
message: error.message,
});
}
});
 
// DELETE
app.delete("/students/:id", async (req, res) => {
try {
const deletedStudent = await Student.findByIdAndDelete(
req.params.id
);
 
if (!deletedStudent) {
  return res.status(404).json({
    message: "Student not found.",
  });
}
 
res.json({
  message: "Student deleted successfully.",
});
 
} catch (error) {
res.status(500).json({
message: error.message,
});
}
});
 
app.listen(5000, () => {
console.log("Server running on port 5000");
});
 