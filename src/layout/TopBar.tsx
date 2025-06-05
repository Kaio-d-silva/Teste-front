import React from 'react';
import { FiMenu } from 'react-icons/fi';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Área Restrita</h1>
      <button
        onClick={toggleSidebar}
        className="text-blue-600 focus:outline-none md:hidden"
      >
        <FiMenu size={24} />
      </button>
    </div>
  );
};

export default TopBar;
