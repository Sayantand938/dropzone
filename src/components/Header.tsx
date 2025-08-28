// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  onCloseApp: () => void;
}

export const Header = ({ onCloseApp }: HeaderProps) => {
  return (
    <div
      className="flex-shrink-0 flex items-center px-2 h-8 bg-black/20"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <span className="flex-grow text-center font-bold select-none pl-6 text-white">
        DropZone
      </span>
      <button
        className="bg-transparent border-none text-zinc-400 text-2xl font-bold cursor-pointer w-6 h-6 leading-none hover:text-white hover:bg-red-600/90"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        onClick={onCloseApp}
      >
        &times;
      </button>
    </div>
  );
};