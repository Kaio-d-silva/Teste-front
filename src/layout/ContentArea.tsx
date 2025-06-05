import React from 'react';
import { Outlet } from 'react-router-dom';

const ContentArea: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <Outlet />
    </div>
  );
};

export default ContentArea;
