import React from 'react';
import './SegmentControl.scss';

interface SegmentControlProps {
  segments: string[];
  activeSegment: string;
  onChange: (segment: string) => void;
  ariaLabel?: string;
}

const SegmentControl: React.FC<SegmentControlProps> = ({
  segments,
  activeSegment,
  onChange,
  ariaLabel = 'Filter options',
}) => (
  <div className="segment-control" role="tablist" aria-label={ariaLabel}>
    {segments.map(segment => (
      <button
        key={segment}
        className={`segment-button ${segment === activeSegment ? 'active' : ''}`}
        onClick={() => onChange(segment)}
        role="tab"
        aria-selected={segment === activeSegment}
        aria-controls={`panel-${segment.toLowerCase()}`}
        id={`tab-${segment.toLowerCase()}`}
      >
        {segment}
      </button>
    ))}
  </div>
);

export default SegmentControl;
