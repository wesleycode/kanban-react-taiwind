import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export const WidgetLoading: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue-500',
  className = '',
  text = 'Carregando...',
  fullScreen = false
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
    : 'flex flex-col items-center justify-center w-full min-h-[700px]';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div
        className={`${sizeClasses[size]} border-1 border-gray-400 border-t-${color} rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};