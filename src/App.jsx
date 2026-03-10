import { useState,useEffect } from "react";
import * as XLSX from "xlsx";
import "./App.css";
import studentsData from "./data/students";


function App() {
// Load students from localStorage if available, otherwise use default data
const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");
  return savedStudents ? JSON.parse(savedStudents) : studentsData;
});

const [editId, setEditId] = useState(null);
const [loading, setLoading] = useState(true);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  age: ""
});

// Simulate loading state when the app starts
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 1000);
}, []);

// Persist students data in localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

// Update form fields when user types
  const handleChange = (e) => {
 const { name, value } = e.target;

setFormData({
  ...formData,
  [name]: name === "age" ? value : value
});
};

// Validate form inputs before adding or updating student
const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.age) {
    alert("All fields are required");
    return;
  }

  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(formData.name)) {
    alert("Name should contain only alphabets");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(formData.email)) {
    alert("Enter a valid email");
    return;
  }

// Check if email already exists (excluding current edit)
const emailExists = students.some(
  (student) =>
    student.email === formData.email &&
    student.id !== editId
);

if (emailExists) {
  alert("Email is already registered");
  return;
}

  if (formData.age <= 0 || formData.age > 120) {
    alert("Enter a valid age between 1 and 120");
    return;
  }

  if (editId !== null) {
  const updatedStudents = students.map((student) =>
    student.id === editId ? { ...student, ...formData } : student
  );

  setStudents(updatedStudents);
  setEditId(null);
}else {
  // Create a unique ID for each new student
  const newStudent = {
  id: Date.now(),
  ...formData
};

  setStudents([...students, newStudent]);
}

  setFormData({
    name: "",
    email: "",
    age: ""
  });
};

// Remove student from the list after confirmation
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student?");

  if (confirmDelete) {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  }
};

// Load selected student data into the form for editing
const handleEdit = (student) => {
  setFormData({
    name: student.name,
    email: student.email,
    age: String(student.age)   // 👈 force string
  });

  setEditId(student.id);

  window.scrollTo({ top: 0, behavior: "smooth" });
};



if (loading) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading students...</p>
    </div>
  );
}

// Export student data to Excel file
const downloadExcel = () => {
  const exportData = students.map((student, index) => ({
  ID: index + 1,
  Name: student.name,
  Email: student.email,
  Age: student.age
}));

const worksheet = XLSX.utils.json_to_sheet(exportData);

const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, "students.xlsx");
};


 return (
  <div className="container">
    <h1>Student Management System</h1>
    <h2>Add Student</h2>
    <button onClick={downloadExcel}>Download Excel</button>

    <form onSubmit={handleSubmit}>
      <input
      type="text"
      name="name"
       placeholder="Enter Name"
       value={formData.name}
       onChange={handleChange}
       pattern="[A-Za-z ]+"
       title="Name should contain only alphabets"
       />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Enter Age"
        value={formData.age}
        onChange={handleChange}
      />

     <button type="submit" >
      {editId !== null ? "Update Student" : "Add Student"}
      </button>

    </form>
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="4">No student record found!</td>
            </tr>
             ) : (
              students.map((student) => (
              <tr key={student.id}>
                 <td>{student.name}</td>
                 <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
              </tr>
              ))
              )}
      </tbody>
    </table>
  </div>
);
}

export default App;