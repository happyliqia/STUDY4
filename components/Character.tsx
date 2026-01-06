
import React from 'react';

interface CharacterProps {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const Character: React.FC<CharacterProps> = ({ name, color, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-24 h-24 text-base',
    lg: 'w-32 h-32 text-xl',
  };

  return (
    <div className={`flex flex-col items-center gap-2 bounce-in`}>
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden`}
        style={{ backgroundColor: color }}
      >
        <span className="text-4xl">
          {name === 'Tom' ? '👦' : name === 'Anna' ? '👧' : name === 'Alex' ? '🧒' : '👩'}
        </span>
      </div>
      <p className="font-bold text-blue-600 uppercase tracking-wide">{name}</p>
    </div>
  );
};

export default Character;
