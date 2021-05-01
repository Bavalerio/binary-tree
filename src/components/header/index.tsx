import '../../index.css';

import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <header>{title}</header>
    </div>
  );
};
