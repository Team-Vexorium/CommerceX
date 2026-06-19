import React from 'react';

const SkeletonLoader = ({ className = '', count = 1, type = 'box' }) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  const getTypeClasses = () => {
    switch (type) {
      case 'circle':
        return 'rounded-full';
      case 'text':
        return 'h-4 rounded';
      case 'box':
      default:
        return 'rounded-xl';
    }
  };

  return (
    <>
      {elements.map((key) => (
        <div
          key={key}
          className={`animate-pulse bg-zinc-800 ${getTypeClasses()} ${className}`}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
