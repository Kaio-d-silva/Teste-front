import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { FiHome } from 'react-icons/fi';
import { TbUsersGroup, TbUsersPlus } from 'react-icons/tb';

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/users', label: 'Listar Usuários', icon: <TbUsersGroup /> },
    { path: '/users/new', label: 'Criar Usuário', icon: <TbUsersPlus /> },
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
