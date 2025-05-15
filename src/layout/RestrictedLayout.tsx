import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FiHome, FiUsers } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
// import { CgUserList } from "react-icons/cg";
import MainContent from "../components/MainContent";

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: <FiHome /> },
    { path: "/users", label: "Listar Usuarios", icon: <FiUsers /> },
    { path: "/users/new", label: "Criar Usuario", icon: <FaUserPlus /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      />
      <MainContent toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default RestrictedLayout;
