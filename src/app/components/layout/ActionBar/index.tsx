import React from 'react';
import { CheckCircle, Play, Lock, ArrowRight } from 'lucide-react';
import './ActionBar.scss';

export type ActionBarState = 'idle' | 'start' | 'continue' | 'completed' | 'locked';

interface ActionBarProps {
  buttonText: string;
  onClick: () => void;
  isDisabled?: boolean;
  state?: ActionBarState;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  buttonText,
  onClick,
  isDisabled = false,
  state = 'idle',
}) => {
  const getIcon = () => {
    switch (state) {
      case 'completed':
        return <CheckCircle size={20} />;
      case 'start':
        return <Play size={20} />;
      case 'locked':
        return <Lock size={20} />;
      case 'continue':
        return <ArrowRight size={20} />;
      default:
        return null;
    }
  };

  const getButtonClass = () => {
    const baseClass = 'action-bar__button';

    switch (state) {
      case 'completed':
        return `${baseClass} action-bar__button--completed`;
      case 'locked':
        return `${baseClass} action-bar__button--locked`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="action-bar">
      <div className="action-bar__container">
        <button
          className={getButtonClass()}
          onClick={onClick}
          disabled={isDisabled || state === 'locked' || state === 'completed'}
        >
          {getIcon()}
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
};
