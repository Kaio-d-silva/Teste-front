import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import UserManagement from "./userManagement";
import UserForm from "./UserForm";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/new" element={<UserForm isEditing={false} />} />
          <Route path="/users/edit/:id" element={<UserForm isEditing />} />

        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
