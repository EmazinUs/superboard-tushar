import React, { ReactNode } from 'react';
import './Container.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`container ${className}`}>{children}</div>
);

export default Container;
