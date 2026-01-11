import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  filled?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size, filled = false }) => {
  const style = size ? { fontSize: `${size}px` } : undefined;

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      translate="no"
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export default Icon;
