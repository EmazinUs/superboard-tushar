import React from 'react';
import './ActionBar.scss';

interface ActionBarProps {
  buttonText: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  buttonText,
  onClick,
  isDisabled = false,
}) => (
  <div className="action-bar">
    <div className="action-bar__container">
      <button className="action-bar__button" onClick={onClick} disabled={isDisabled}>
        {buttonText}
      </button>
    </div>
  </div>
);
