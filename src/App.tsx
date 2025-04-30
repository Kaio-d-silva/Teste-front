import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import UserManagement from "./userManagement";
import UserForm from "./UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<UserForm isEditing={false} />} />
        <Route path="/users/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </Router>
  );
}

export default App;
