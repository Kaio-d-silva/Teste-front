import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  menuItems: { path: string; label: string; icon: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  menuItems,
}) => {
  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-blue-600 text-white transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <span
          className={`${isSidebarOpen ? 'block' : 'hidden'} text-lg font-bold`}
        >
          Meu Sistema
        </span>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 hover:bg-blue-500 transition-colors ${
                isActive ? 'bg-blue-700' : ''
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
