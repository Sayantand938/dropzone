// src/components/Footer.tsx
import React, { DragEvent } from 'react';
import { DroppedFile } from '../types/types';

interface FooterProps {
  files: DroppedFile[];
  onGrabAllDragStart: (event: DragEvent<HTMLButtonElement>) => void;
  onClear: () => void;
}

export const Footer = ({ files, onGrabAllDragStart, onClear }: FooterProps) => {
  return (
    <div
      className="flex-shrink-0 flex gap-2.5 p-2.5"
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
    >
      {files.length > 1 && (
        <button
          className="flex h-10 flex-grow items-center justify-center rounded-sm border border-blue-500/50 bg-blue-500/20 font-mono text-white cursor-grab active:cursor-grabbing hover:border-blue-500/60 hover:bg-blue-500/30"
          draggable
          onDragStart={onGrabAllDragStart}
        >
          Grab All
        </button>
      )}
      <button
        onClick={onClear}
        disabled={files.length === 0}
        className="flex h-10 flex-grow items-center justify-center rounded-sm border border-white/20 bg-white/10 font-mono text-white cursor-pointer hover:border-white/30 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear All
      </button>
    </div>
  );
};