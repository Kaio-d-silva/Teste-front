import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Home, UserManagement } from "./Home";
import UserForm from "./UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </Router>
  );
}

export default App;
