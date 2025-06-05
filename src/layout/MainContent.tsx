import React from 'react';
import TopBar from './TopBar';
import ContentArea from './ContentArea';

interface MainContentProps {
  toggleSidebar: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col flex-1">
      <TopBar toggleSidebar={toggleSidebar} />
      <ContentArea />
    </div>
  );
};

export default MainContent;
