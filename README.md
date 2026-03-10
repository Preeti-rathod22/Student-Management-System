# 🎓 Student Management System

A React.js frontend application that performs full CRUD (Create, Read, Update, Delete) operations entirely on the client side using in-memory state and localStorage.

This project was developed as part of a frontend assignment.

---

## 🚀 Live Demo

🔗 https://your-live-link.vercel.app

---

## 📌 Features

- Add new students with validation
- Edit existing student details with pre-filled form
- Delete students with confirmation dialog
- Email format validation
- Unique email validation
- Age validation (1–120 range)
- Simulated loading state with spinner
- Persistent data using localStorage
- Export student data to Excel (.xlsx)
- Clean and responsive user interface

---

## 🛠️ Tech Stack

- React.js (Functional Components & Hooks)
- useState & useEffect
- XLSX library for Excel export
- CSS3 for styling
- localStorage for client-side persistence

---

## 🧠 Validation Rules

- All fields are mandatory
- Name must contain only alphabets
- Email must be in valid format
- Email must be unique
- Age must be between 1 and 120

---

## 📂 Project Structure
│
├── App.js
├── App.css
├── data/
│ └── students.js
└── main.jsx


---

## ⚙️ Installation & Setup

1. Clone the repository
git clone https://github.com/your-username/student-management-system.git

2. Navigate into the project directory
cd student-management-system

3. Install dependencies
npm install

4. Run the development server
npm run dev

---

## 💡 Design Decisions

- All CRUD operations are handled on the frontend as per assignment requirements.
- Data persistence is achieved using localStorage.
- Email uniqueness validation is implemented to simulate real-world data constraints.
- A simulated loading state enhances user experience.
- Excel export functionality allows downloading student records.

---

## 👩‍💻 Author

Preeti Rathod  
Frontend Developer