import { useEffect, useState } from "react";
import axios from "axios";
 
function App() {
const [students, setStudents] = useState([]);
 
const [name, setName] = useState("");
const [course, setCourse] = useState("");
const [age, setAge] = useState("");
 
const [editingId, setEditingId] = useState(null);
 
// READ
const fetchStudents = () => {
axios
.get("http://localhost:5000/students")
.then((response) => {
setStudents(response.data);
})
.catch((error) => {
console.log(error);
});
};
 
useEffect(() => {
fetchStudents();
}, []);
 
// CREATE
const addStudent = async () => {
try {
await axios.post("http://localhost:5000/students", {
name,
course,
age,
});
 
  setName("");
  setCourse("");
  setAge("");
 
  fetchStudents();
} catch (error) {
  console.log(error);
}
 
};
 
// LOAD DATA FOR EDIT
const editStudent = (student) => {
setEditingId(student._id);
setName(student.name);
setCourse(student.course);
setAge(student.age);
};
 
// UPDATE
const updateStudent = async () => {
try {
await axios.put(
"http://localhost:5000/students/${editingId}",
{
name,
course,
age,
}
);
 
  setEditingId(null);
  setName("");
  setCourse("");
  setAge("");
 
  fetchStudents();
} catch (error) {
  console.log(error);
}
 
};
 
// DELETE
const deleteStudent = async (id) => {
try {
await axios.delete(
"http://localhost:5000/students/${id}"
);
 
  fetchStudents();
} catch (error) {
  console.log(error);
}
 
};
 
return (
<div style={{ padding: "20px" }}>
<h1>Student Management System</h1>
 
  <h2>
    {editingId ? "Update Student" : "Add Student"}
  </h2>
 
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
 
  <br />
  <br />
 
  <input
    type="text"
    placeholder="Course"
    value={course}
    onChange={(e) => setCourse(e.target.value)}
  />
 
  <br />
  <br />
 
  <input
    type="number"
    placeholder="Age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
  />
 
  <br />
  <br />
 
  {editingId ? (
    <button onClick={updateStudent}>
      Update Student
    </button>
  ) : (
    <button onClick={addStudent}>
      Add Student
    </button>
  )}
 
  <hr />
 
  <h2>Students</h2>
 
  {students.map((student) => (
    <div
      key={student._id}
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>Name: {student.name}</p>
      <p>Course: {student.course}</p>
      <p>Age: {student.age}</p>
 
      <button onClick={() => editStudent(student)}>
        Edit
      </button>
 
      <button
        onClick={() => deleteStudent(student._id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  ))}
</div>
 
);
}
 
export default App;
 